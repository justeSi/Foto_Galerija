
// -----------------API----------------------------------
var row = document.querySelector('.row');
fetch('https://api.unsplash.com/photos?client_id=_CfdRIyvRxD4LnrNlRj-r7pGE5ZAcul5s_Pp4Vy41x0&page=55')
.then(res => res.json())
.then(data => {
    console.log(data);
    for(var i = 0; i < data.length; i++) {
        console.log(data[i].urls.regular);
        row.innerHTML+= 
        `<div class="col-md-6 grid-item">
                <img class=" image"  src="${data[i].urls.regular}" alt="">
                    <h5 class="name mt-3">Fotografas: ${data[i].user.first_name}</h5>
                    <p class="title">Aprašymas: ${data[i].alt_description}</p>
                    <p class="likes"><i class="fa fa-thumbs-up"></i> ${data[i].likes}</p>
                </div>`    
            }
            // ------------------------RIKIAVIMAS----------------------------------
            var iso = new Isotope('.grid', {
                itemSelector: '.grid-item',
                stagger: 30,
                getSortData: {
                    name: '.name',
                    title: '.title',
                    number: '.likes parseInt'
                },
                masonry: {
                    columnWidth: '.grid-sizer',
                    gutter: '.grid-gutter-sizer'
                },
                sortBy: 'original-order',
                sortAscending: {
                    name: true,
                    number: true
                }
            });
            var sortByGroup = document.querySelector('.sort-by-button-group');
                sortByGroup.addEventListener('click', function(event){

                    if (!matchesSelector(event.target, '.btn')) {
                        return;
                    }

                    var sortValue = event.target.getAttribute('data-sort-value');
                    var sortDirection = event.target.getAttribute('data-sort-direction');
                    var isAscending = (sortDirection == 'asc'); //true, folse

                    iso.arrange({
                        sortBy: sortValue,
                        sortAscending: isAscending
                    });


                    console.log(isAscending);

                    console.log(sortValue);
                    console.log( sortDirection);
                });
        });
            
// -----------------INFINETE SCROLL.......................................
        var currentscrollHeight = 0;
        var count = 0;
        // Parenkamas skaičius puslapio nuo kurio vis scrollinant keisis 'page' nr
        var sig = 20;
        ScrollDebounce = true;
        
    $(window).on("scroll", function () {
        const scrollHeight = $(document).height();
        const scrollPos = Math.floor($(window).height() + $(window).scrollTop());
        const isBottom = scrollHeight - 100 < scrollPos;
         
        if (isBottom && currentscrollHeight < scrollHeight) { 
        
            if (ScrollDebounce) { 
                ScrollDebounce = false;
            
                fetch('https://api.unsplash.com/photos?client_id=_CfdRIyvRxD4LnrNlRj-r7pGE5ZAcul5s_Pp4Vy41x0&page='+sig)
                .then(res => res.json())
                .then(data => {

                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].urls.regular);
                    row.innerHTML+= `
                    <div class="col-md-6 grid-item">
                            <img class=" image"  src="${data[i].urls.regular}" alt="">
                            <h5 class="name mt-3">Fotografas: ${data[i].user.first_name}</h5>
                            <p class="title">Aprašymas: ${data[i].alt_description}</p>
                            <p class="likes"><i class="fa fa-thumbs-up"></i> ${data[i].likes}</p>
                    </div>`    
                        }
                        sig++;
            console.log(sig);
                        var iso = new Isotope('.grid', {
                            itemSelector: '.grid-item',
                            stagger: 30,
                            getSortData: {
                                name: '.name',
                                title: '.title',
                                number: '.likes parseInt'
                            },
                            masonry: {
                                columnWidth: '.grid-sizer',
                                gutter: '.grid-gutter-sizer'
                            },
                            sortBy: 'title',
                            sortAscending: {
                                name: true,
                                number: true
                            }
                        });
                        var sortByGroup = document.querySelector('.sort-by-button-group');
                sortByGroup.addEventListener('click', function(event){

                    if (!matchesSelector(event.target, '.btn')) {
                        return;
                    }

                    var sortValue = event.target.getAttribute('data-sort-value');
                    var sortDirection = event.target.getAttribute('data-sort-direction');
                    var isAscending = (sortDirection == 'asc'); //true, folse

                    iso.arrange({
                        sortBy: sortValue,
                        sortAscending: isAscending
                    });


                    // console.log(isAscending);

                    // console.log(sortValue);
                    // console.log( sortDirection);
                });
            
            });
            console.log(ScrollDebounce);
            setTimeout(function () { ScrollDebounce = true; }, 100); 
            currentscrollHeight = scrollHeight;
        
    }
    }});
    // ======="Lengas scrollinimas atgal į viršų =========="
    $('#up').click(function() {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
    });
    