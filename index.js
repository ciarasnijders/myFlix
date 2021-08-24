
//Express GET route located at the endpoint “/movies” that returns movies
app.get('/movies', (req, res) => {
  res.json(movies);
});