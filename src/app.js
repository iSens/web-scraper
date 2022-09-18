const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:3030/results')
    .then(response => response.json())
    .then(data => {
        data.forEach(article => {
            // const articleItem = `<li class="list-group-item"><a href="https://www.total-croatia-news.com/` + article.link + `" target="_blank">` + article.title + `</a><span>` + article.date + `</span></li>`
            const articleItem = `
            <a href="https://www.total-croatia-news.com/` + article.link + `" target="_blank" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">` + article.title + `</h5>
              <small>` + article.date + `</small>
            </div>
            <small>` + article.intro + `...</small>
          </a>`


            feedDisplay.insertAdjacentHTML("beforeend", articleItem)
        });
    })
    .catch(error => console.log(error))