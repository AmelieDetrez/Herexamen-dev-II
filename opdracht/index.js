class Author {
    constructor(data) {
        this.data = data;
    }
    get htmlString() {
        return `    <div id="results">
      <article>
        <div class="image_wrapper">
            <img src="${this.cover_i}">
                </div>
            <div class="article_content_wrapper">
            <div>
            <h3>${this.title_suggest}</h3>
            <h4>${this.author_name}</h4>
            </div>
            <div class=${this.first_publish_year}></div>
            </div>
            </article>
            </div>
           `
    }
}

class Authors {
    constructor(description) {
        this.description = description;
        this.renderInThisElement = document.getElementById('results');
        this.getData();
    }
    renderResults(content) {
        this.renderInThisElement.innerHTML = content;
    }
    async getData() {
        this.renderResults('loading...');
        const response = await fetch(`http://openlibrary.org/search.json?author=${this.description}`);
        this.data = await response.json();
        console.log(response);
        this.render();
    }
    render() {
        if (this.data.length === 0) {
            this.renderResults(`No books for author: ${this.description}`);
        } else {
            let htmlString = '';
            const authorsList = this.data.map(authorData => {
                const author = new Author(authorData);
                htmlString += author.htmlString;
                return author;
            });
            this.renderResults(htmlString);
            authorsList.forEach(author => {
                author.bindEvents();
            })
        }
    }
}


class Form {
    constructor() {
        this.descriptionInput = document.getElementById('description');
        this.form = document.getElementById('form');
        this.bindEvents();
    }
    bindEvents() {
        this.form.addEventListener('submit', this.submitForm.bind(this));
    }
    submitForm(event) {
        event.preventDefault();
        new Authors(this.descriptionInput.value);
    }
}

new Form();

/* tried this but doesn't work either

class Authors {
    constructor() {
        this.renderInThisElement = document.getElementById('results');
        this.getData();
    }
    renderResults(content) {
        this.renderInThisElement.innerHTML = content;
    }
    async getData() {
        this.renderResults('loading...');
        const response = await fetch(`http://openlibrary.org/search.json?author=${this.author_name}`);
        this.data = await response.json();
        this.render();
        this.bindEvents();
    }
    render() {
        this.renderResults(
            this.data.map(({
                author_name,
                first_publish_year,
                title_suggest,
                cover_i
            }) => `
        <div id="results">
      <article>
        <div class="image_wrapper">
            <img src="${cover_i}">
                </div>
            <div class="article_content_wrapper">
            <div>
            <h3>${title_suggest}</h3>
            <h4>${author_name}</h4>
            </div>
            <div class=${first_publish_year}></div>
            </div>
            </article>
            </div>
        `).join('')
        );
    }
}

new Authors()*/