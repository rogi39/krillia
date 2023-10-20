var loadmoreNews = document.querySelector('.loadmoreNews');
var currentPage = 1;
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
	loadmoreNews.classList.add('disabled');
	const xhr = new XMLHttpRequest();
	const data = new FormData();
	data.append("action", "loadmore_news");
	data.append("page", currentPage);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				loadmoreNews.classList.remove('disabled');
				let response = xhr.responseText;
				let divResponse = document.createElement("div");
				divResponse.innerHTML = xhr.responseText;
					// console.log(divResponse);return;
					let itemsResponse = divResponse.querySelectorAll('.news__col');
					let parent = document.querySelector("#newsResponse");
					// console.log(itemsResponse);console.log(parent);return;
					if(response){
						itemsResponse.forEach(el=>{
							parent.append(el);
						});
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