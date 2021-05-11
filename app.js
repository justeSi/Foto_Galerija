
// -----------------API----------------------------------
var row = document.querySelector('.row');
fetch('https://api.unsplash.com/photos?client_id=_CfdRIyvRxD4LnrNlRj-r7pGE5ZAcul5s_Pp4Vy41x0&page=55')
.then(res => res.json())
.then(data => {
    console.log(data);
    for(var i = 0; i < data.length; i++) {
        console.log(data[i].urls.regular);
        row.innerHTML+= `
        <div class="col-md-6 grid-item">
                <img class=" image"  src="${data[i].urls.regular}" alt="">
                    <h5>Fotografas: ${data[i].user.first_name}</h5>
                    <p class="title"> ${data[i].alt_description}</p>
                </div>`    
            }
            // ------------------------RIKIAVIMAS----------------------------------
            var iso = new Isotope('.grid', {
                itemSelector: '.grid-item',
                stagger: 30,
                getSortData: {
                    title: '.title'
                },
                masonry: {
                    columnWidth: '.grid-sizer',
                    gutter: '.grid-gutter-sizer'
                },
                sortBy: 'title',
                sortAscending: true,
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
                                <h5>Fotografas: ${data[i].user.first_name}</h5>
                                <p class="title"> ${data[i].alt_description}</p>
                            </div>`    
                        }
                        var iso = new Isotope('.grid', {
                            itemSelector: '.grid-item',
                            stagger: 30,
                            getSortData: {
                                title: '.title'
                            },
                            masonry: {
                                columnWidth: '.grid-sizer',
                                gutter: '.grid-gutter-sizer'
                            },
                            sortBy: 'title',
                            sortAscending: true,
                        });
            sig++;
            console.log(sig);
            });
            console.log(ScrollDebounce);
            setTimeout(function () { ScrollDebounce = true; }, 100); 
            currentscrollHeight = scrollHeight;
        
    }
    }});