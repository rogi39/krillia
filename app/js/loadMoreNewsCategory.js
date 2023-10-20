var loadmoreNews = document.querySelector('.loadmoreCategoryNews');
var currentPage = loadmoreNews.getAttribute('data-page');
var act = '/wp-admin/admin-ajax.php';
var pageNext = loadmoreNews.getAttribute('data-page');
var pages = loadmoreNews.getAttribute('data-pages');
if (pageNext < pages) {
	pageNext++;
}
window.addEventListener("DOMContentLoaded", ()=>{
	if (currentPage == pageNext) {
		loadmoreNews.remove();
	}
});
loadmoreNews.addEventListener('click',(e)=>{
	e.preventDefault();
	var link = loadmoreNews.getAttribute('data-link') + "page/" + pageNext + "/";
	window.history.pushState("", "Title", link);
	loadmoreNews.classList.add('disabled');
	const xhr = new XMLHttpRequest();
	const data = new FormData();
	data.append("action", "loadmore_news_category");
	data.append("page", currentPage);
	data.append("category", loadmoreNews.getAttribute('data-category'));
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				loadmoreNews.classList.remove('disabled');
				let response = xhr.responseText;
				let divResponse = document.createElement("div");
				divResponse.innerHTML = xhr.responseText;
					// console.log(divResponse);return;
					let paginationResponse = divResponse.querySelector('.pagination');
					let itemsResponse = divResponse.querySelectorAll('.news__col');
					let parent = document.querySelector("#newsResponse");
					let pagination = document.querySelector('.pagination');
					// console.log(itemsResponse);console.log(parent);return;
					if(response){
						itemsResponse.forEach(el=>{
							parent.append(el);
						});
						pagination.replaceWith(paginationResponse);
					}
					if (pageNext == pages) {
						loadmoreNews.remove();
						console.log(pageNext);
					} else {
						pageNext++;
					}
					currentPage++;
				} else {
					console.log('An error occurred during your request: ' +  xhr.status + ' ' + xhr.statusText);
				}
			}
		}
		xhr.open("POST", act);
		xhr.send(data);
	});