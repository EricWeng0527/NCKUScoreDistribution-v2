(function () {
    var success = false;
    var table = document.querySelectorAll('table')[3];

    if (table) {
        var rows = table.querySelectorAll('tr');

        if (rows && rows[0] && rows[0].querySelector('td')) {
            var firstRowText = rows[0].querySelector('td').innerText || rows[0].querySelector('td').textContent;
            var splitText = firstRowText.split(/\s+/);

            var year = splitText[0].slice(0, 4);
            var sem = splitText[0][4] == "上" ? 1 : 2;

            for (var i = 2; i < rows.length - 2; i++) {
                var cells = rows[i].querySelectorAll('td');

                if (cells && cells.length >= 10) {
                    var cellText = cells[2].innerText || cells[2].textContent;
                    var course_code = cellText.length > 7 ? cellText.substring(0, 7) : cellText;
                    var class_name = cells[3].innerText || cells[3].textContent;
                    var class_code = cellText.length > 7 ? cellText.substring(7) : "";

                    var show = document.createElement("span");
                    show.style.textDecoration = "underline";
                    show.style.color = "blue";
                    show.style.fontWeight = "bold";
                    show.style.cursor = "pointer";
                    show.title = "瀏覽成績分佈曲線圖";
                    (function (cn, y, s, cc, ccode) {
                        show.onclick = function () {
                            load_histogram(cn, y, s, cc, ccode);
                        };
                    })(class_name, year, sem, course_code, class_code);
                    show.innerText = "檢視";
                    cells[10].innerHTML = "";
                    cells[10].appendChild(show);
                    success = true;

                }
            }
        }
    }

    var imgURL;
    var overlay = document.createElement('div');
    var img = document.createElement('img');

    if (success) {
        imgURL = "https://github.com/EricWeng0527/NCKUScoreDistribution-v2/blob/main/success.png?raw=true";
        img.style.width = '200px';
    } else {
        imgURL = "https://github.com/EricWeng0527/NCKUScoreDistribution-v2/blob/main/fail.png?raw=true";
        img.style.width = '250px';
    }

    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = 10000;
    overlay.style.transition = 'opacity 1s';
    overlay.style.opacity = '0';

    img.src = imgURL;
    img.style.position = 'absolute';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.transform = 'translate(-50%,-50%)';
    img.style.zIndex = 10001;
    img.style.transition = 'opacity 1s';

    var counter = document.createElement('span');
    var randomNum = new Date().getTime();
    var counterImgSrc = "https://hitwebcounter.com/counter/counter.php?page=9467630&style=0008&nbdigits=5&type=page&initCount=0&random=" + randomNum;
    counter.innerHTML = "累積使用人數：<a href=\"https://www.hitwebcounter.com\" target=\"_blank\">\
<img src="+ counterImgSrc + " title=\"Counter Widget\" Alt=\"Visit counter For Websites\"   border=\"0\" /></a>";
    counter.style.fontSize = '12px';
    counter.style.color = 'white';


    overlay.appendChild(img);
    overlay.appendChild(counter);
    document.body.appendChild(overlay);
    setTimeout(function () {
        overlay.style.opacity = '1';
        setTimeout(function () {
            overlay.style.opacity = '0';
            img.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(overlay);
            }, 1000);
        }, 1200);
    }, 800);

})();






