var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
var data ='';
var district;
var title = document.querySelector(".title");
var content = document.querySelector(".content");
var select = document.querySelector(".select-style");

xhr.onload = function(){
	data = (JSON.parse(xhr.responseText)); 
    district = data.result.records; //資料在result.records裡
    //過濾乾淨的陣列到array裡
	let areaList =[];
	for(let i=0; i<district.length; i++){
		areaList.push(district[i].Zone);
    }
    //再用forEach判斷陣列裡面所有的值是否有吻合
	let area = [];
	areaList.forEach(function(value){
		if(area.indexOf(value) == -1){
			area.push(value);
		}
    })
    let selectStr = '';
    for(let i=0; i<area.length; i++){
        selectStr += '<option>' + area[i] + '</option>';
        select.innerHTML = '<option>---請選擇行政區---</option>'+ selectStr;
    }
    //監聽select
    select.addEventListener('change', update ,false);
    //列出資料
    function update(e){
        let str = '';
        let tstr = '';
        let main = e.target.value;
        for(let i=0; i<district.length; i++){
            if(main == district[i].Zone){
                let img = district[i].Picture1;
                let name = district[i].Name;
                let lab = ' ';
                let time = district[i].Opentime;
                let address = district[i].Add;
                let telnumber = district[i].Tel;
                str += `<div><img class="contentImg" src="${img}"><p class="name">${name}</p><p class="icon1"><img src="images/icons_clock.png">${lab}${time}</p><p class="icon2"><img src="images/icons_pin.png">${lab}${address}</p><p class="icon3"><img src="images/icons_phone.png">${lab}${telnumber}</p></div>`;
                tstr = `<p>${main}</p>`;
            }
        }
        content.innerHTML = str;
        title.innerHTML = tstr;
    }
}