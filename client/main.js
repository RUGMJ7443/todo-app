const notFound = '...Not Found...';
axios
  .get('http://localhost:3000')
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      const element = res.data[i];
      $('.todos').append(`
            <div class="todo">
                <h2>${element.title || notFound}</h2>
                <p>${element.body || notFound}</p>
            </div>
        `);
    }
  })
  .catch((err) => {
    if (err) {
      console.error(err);
    }
  });

$('.button').on('click', (e) => {
  e.preventDefault();
  axios
    .post('http://localhost:3000', {
      title: $('.title').val(),
      body: $('.body').val(),
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
});
