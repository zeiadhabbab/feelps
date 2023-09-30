window.egLoadNextPage = async (btn) => {
    btn.innerHTML = `
      <div class="loading-overlay__spinner">
            <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
            </svg>
      </div>
    `;
    const respoonse = await fetch(btn.dataset.nextPageUrl);
    const data = await respoonse.text();

    const parser = new DOMParser();
    const newDocument = parser.parseFromString(data, 'text/html');

    document.querySelector('#product-grid')
        .insertAdjacentHTML('beforeend', newDocument.querySelector('#product-grid').innerHTML);

    document.querySelector('#eg-infinite-pagination')
        .replaceWith(newDocument.querySelector('#eg-infinite-pagination'));

    const event = new CustomEvent('eg.paginate.next');
    document.querySelector('#eg-infinite-pagination').dispatchEvent(event);
};
