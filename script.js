;(function () {
  'use strict'

  const get = (target) => document.querySelector(target);
  const getAll = (target) => document.querySelectorAll(target);

  const $search = get('#search');
  const $list = getAll('.contents.list figure');
  const $searchButton = get('.btn_search');
  
  const init = () => {
    $search.addEventListener('keyup', search);
    $searchButton.addEventListener('click', search);
    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('picture');
      $target.addEventListener('mouseover', onMouseOver);
      $target.addEventListener('mouseout', onMouseOut);
    }
    for (let index = 0; index < $list.length; index++) {
      $list[index].addEventListener('click', hashChange);
    }

    window.addEventListener('hashchange', () => {
      const isView = -1 < window.location.hash.indexOf('view');
      if (isView) {
        getViewPage();

      } else {
        getListView();
      }
    })
  }

  const search = () => {
    let searchText = $search.value.toLowerCase();
    for (let index = 0; index < $list.length; index++) {
     
      const $target = $list[index].querySelector('strong');
      const text = $target.textContent.toLowerCase();
      if (- 1 < text.indexOf(searchText)) {
        $list[index].style.display = 'flex';
      } else {
        $list[index].style.display = 'none';
      }
    }
  }

  const onMouseOver = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source');
    webpPlay.setAttribute('srcset', './assets/sample.webp');
  }

  const onMouseOut = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source');
    webpPlay.setAttribute('srcset', './assets/sample.jpg');
  }

  const hashChange = (e) => {
    e.preventDefault();
    const parentNode = e.target.closest('figure');
    const viewTitle = parentNode.querySelector('strong').textContent;
    window.location.hash = `view${viewTitle}`;
    getViewPage();
  }

  const getViewPage = () => {
    const viewTitle = get('.view strong');
    const urlTitle = decodeURI(window.location.hash.split('&')[1]);
    viewTitle.innerText - urlTitle;

    get('.list').style.display = 'none';
    get('.view').style.display = 'flex';
  }

  const getListView = () => {
    get('.view').style.display = 'none';
    get('.list').style.display = 'flex';
  }
  init();
})()

