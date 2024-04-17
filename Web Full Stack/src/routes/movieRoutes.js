
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

//Xây dựng API danh sách, thêm, sửa, xóa dữ liệu phim (CURD).
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    time: req.body.time,
    year: req.body.year,
    image: req.body.image,
    introduce: req.body.introduce
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.name = req.body.name || movie.name;
    movie.time = req.body.time || movie.time;
    movie.year = req.body.year || movie.year;
    movie.image = req.body.image || movie.image;
    movie.introduce = req.body.introduce || movie.introduce;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    await movie.remove();
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Xây dựng API tìm kiếm phim theo tên phim.
router.get('/search', async (req, res) => {
  const searchQuery = req.query.name;

  try {
    const movies = await Movie.find({ name: { $regex: searchQuery, $options: 'i' } });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Xây dựng API danh sách phim được sắp xếp theo năm.
router.get('/sortedByYear', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ year: 1 }); 
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
