//파일 url 가져오기
var globalFileUrl = decodeURI(window.location.href);

//파일명 가져오기
var globalFileName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);

if (globalFileName.indexOf("#") > -1) {
    globalFileName = globalFileName.substring(0, globalFileName.indexOf("#"));
}

if (globalFileName.indexOf("?") > -1) {
    globalFileName = globalFileName.substring(0, globalFileName.indexOf("?"));
}

//파일명에서 메뉴 가져오기
var globalFileMenu = (globalFileName != "") ? globalFileName.substring(0, globalFileName.lastIndexOf("-")) : "";

globalFileMenu = (globalFileMenu.startsWith("new-")) ? globalFileMenu.substring(4) : globalFileMenu;
globalFileMenu = (globalFileMenu.indexOf("-") > -1) ? globalFileMenu.substring(0, globalFileMenu.indexOf("-")) : globalFileMenu;

//정규식 체크
var globalIdExp = RegExp(/^[A-Za-z0-9_\-]{6,12}$/);
var globalpwExp = RegExp(/^[A-Za-z0-9_\-]{8,20}$/);

//차트 설정
let surveyCtx;
let surveyChart;
let statsCtx;
let statsChart;
const chartBackgroundColor = ['rgba(225,83,73,0.6)', 'rgba(213,50,105,0.6)', 'rgba(146,52,162,0.6)', 'rgba(106,70,170,0.6)', 'rgba(75,89,169,0.6)', 'rgba(54,147,222,0.6)', 'rgba(27,160,220,0.6)', 'rgba(21,171,191,0.6)', 'rgba(15,135,123,0.6)', 'rgba(86,165,89,0.6)', 'rgba(138,183,86,0.6)', 'rgba(192,204,73,0.6)', 'rgba(235,218,78,0.6)', 'rgba(230,179,31,0.6)', 'rgba(229,146,25,0.6)', 'rgba(233,98,56,0.6)', 'rgba(116,87,77,0.6)', 'rgba(158,158,158,0.6)', 'rgba(100,123,134,0.6)', 'rgba(0,0,0,0.6)'];
const chartBolderColor = ['rgb(225,83,73)', 'rgb(213,50,105)', 'rgb(146,52,162)', 'rgb(106,70,170)', 'rgb(75,89,169)', 'rgb(54,147,222)', 'rgb(27,160,220)', 'rgb(21,171,191)', 'rgb(15,135,123)', 'rgb(86,165,89)', 'rgb(138,183,86)', 'rgb(192,204,73)', 'rgb(235,218,78)', 'rgb(230,179,31)', 'rgb(229,146,25)', 'rgb(233,98,56)', 'rgb(116,87,77)', 'rgb(158,158,158)', 'rgb(100,123,134)', 'rgb(0,0,0)'];

$(function() {
    //nav 설정
    //메뉴에 data-step이 없을 경우 추가
    $("#nav>.side-navbar ul>li>a+ul").each(function() {
        var navStep = $(this).parents("ul").length;

        if ($(this).is("[data-step]") == false) {
            $(this).attr("data-step", navStep);
        }
    });

    //파일명으로 현재 페이지 메뉴 활성화
    var $showNav;

    if ($("#nav>.side-navbar ul>li>a[href='" + globalFileName + "']").length > 0) {
        $showNav = $("#nav>.side-navbar ul>li>a[href='" + globalFileName + "']");
    } else if ($("#nav>.side-navbar ul>li>a[data-menu='" + globalFileMenu + "']").length > 0) {
        $showNav = $("#nav>.side-navbar ul>li>a[data-menu='" + globalFileMenu + "']");
    }

    if ($showNav != undefined) {
        var navStep = $showNav.parent("li").parent("ul").attr("data-step");

        if (navStep != undefined) {
            for (var i=navStep; i>0; i--) {
                var parentNavId = $showNav.parent("li").parent("ul").attr("id");

                $("#" + parentNavId).collapse('show');

                if ($showNav.next("ul").length > 0) {
                    var navId = $showNav.next("ul").attr("id");

                    $("#" + navId).collapse('show');
                }

                if (i == navStep) {
                    $showNav.addClass("active");
                }

                $showNav = $showNav.parent("li").parent("ul").prev("a");
            }
        } else {
            if ($showNav.next("ul").length > 0) {
                var navId = $showNav.next("ul").attr("id");

                $("#" + navId).collapse('show');
            }

            $showNav.parent("li").addClass("active");
        }
    }
          
    // ------------------------------------------------------- //
    // Sidebar Functionality
    // ------------------------------------------------------ //
    $('#toggle-btn').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');

        $('.side-navbar').toggleClass('shrinked');
        $('.content-inner').toggleClass('active');
    });
    
    // Close dropdown after click
    $(".side-navbar li a").click(function(event) {
        //동일한 data-step을 갖는 메뉴만 보이기/숨기기
        var navStep = $(this).next(".collapse").attr("data-step");
        var navCnt = $(this).parents("ul").length;

        if (navStep != undefined) {
            if (navCnt > 1) {
                var parentNavId = $(this).closest("ul").attr("id");

                $("#" + parentNavId).find(".collapse[data-step='" + navStep + "']").collapse('hide');
            } else {
                $(".collapse[data-step='" + navStep + "']").collapse('hide');
            }
        }
    });

    // ------------------------------------------------------- //
    // Dynamic Height
    // ------------------------------------------------------ //	
    $(window).resize(function(){
        var height = $(this).height() - $(".header").height() + $(".main-footer").height()
        $('.d-scroll').height(height);
    })

    $(window).resize();

    // ------------------------------------------------------- //
    // Auto Height Scrollbar
    // ------------------------------------------------------ //
    $(window).resize(function() {
        $('.auto-scroll').height($(window).height() - 130);
    });

    $(window).trigger('resize');

    // ------------------------------------------------------- //
    // Custom Checkbox (check, heart, star)
    // ------------------------------------------------------ //
    $('.checkbox').click(function(){
        $(this).toggleClass('is-checked');
    });

    // ------------------------------------------------------- //
    // Check / Uncheck all checkboxes
    // ------------------------------------------------------ //
    $("#check-all").change(function () {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });

    // ------------------------------------------------------- //
    // Card Close
    // ------------------------------------------------------ //
    $('a.remove').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.col-remove').fadeOut(500);
    });

    // ------------------------------------------------------- //
    // Sidebar Scrollbar
    // ------------------------------------------------------ //	
    $(".sidebar-scroll").niceScroll({
        cursorcolor: "transparent",
        cursorborder: "transparent",
        cursoropacitymax: 0,
        boxzoom: false,
        autohidemode: "hidden",
        cursorfixedheight: 80
    });

    // ------------------------------------------------------- //
    // Widget Scrollbar
    // ------------------------------------------------------ //	
    $(".widget-scroll").niceScroll({
        railpadding: {
            top: 0,
            right: 3,
            left: 0,
            bottom: 0
        },
        scrollspeed: 100,
        zindex: "auto",
        autohidemode: "leave",
        cursorwidth: "4px",
        cursorcolor: "rgba(52, 40, 104, 0.1)",
        cursorborder: "rgba(52, 40, 104, 0.1)"
    });

    // ------------------------------------------------------- //
    // Table Scrollbar
    // ------------------------------------------------------ //	
    $(".table-scroll").niceScroll({
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        scrollspeed: 100,
        zindex: "auto",
        autohidemode: "leave",
        cursorwidth: "4px",
        cursorcolor: "rgba(52, 40, 104, 0.1)",
        cursorborder: "rgba(52, 40, 104, 0.1)"
    });

    // ------------------------------------------------------- //
    // Offcanvas Scrollbar
    // ------------------------------------------------------ //	
    $(".offcanvas-scroll").niceScroll({
        railpadding: {
            top: 0,
            right: 2,
            left: 0,
            bottom: 0
        },
        scrollspeed: 100,
        zindex: "auto",
        hidecursordelay: 800,
        cursorwidth: "3px",
        cursorcolor: "rgba(52, 40, 104, 0.1)",
        cursorborder: "rgba(52, 40, 104, 0.1)",
        preservenativescrolling: true,
        boxzoom: false
    });

    // ------------------------------------------------------- //
    // Search Box
    // ------------------------------------------------------ //
    $('#search').on('click', function (e) {
        e.preventDefault();
        $('.search-box').slideDown();
    });
    
    $('.dismiss').on('click', function () {
        $('.search-box').slideUp();
    });

    // ------------------------------------------------------- //
    // Adding slide effect to dropdown
    // ------------------------------------------------------ //
    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    });

    // ------------------------------------------------------- //
    // Options hover effect to dropdown
    // ------------------------------------------------------ //
    $('.widget-options > .dropdown, .actions > .dropdown, .quick-actions > .dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(350);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(350);
    });

    // ------------------------------------------------------- //
    // Offcanvas Sidebar
    // ------------------------------------------------------ //
    //open
    $('.open-sidebar').on('click', function (event) {
        event.preventDefault();
        $('.off-sidebar').addClass('is-visible');
    });
    
    //close
    $('.off-sidebar').on('click', function (event) {
        if ($(event.target).is('.off-sidebar') || $(event.target).is('.off-sidebar-close')) {
            $('.off-sidebar').removeClass('is-visible');
            event.preventDefault();
        }
    });

    // ------------------------------------------------------- //
    // Close Modal After Time Period
    // ------------------------------------------------------ //
    $('#delay-modal').on('show.bs.modal', function () {
        var myModal = $(this);
        clearTimeout(myModal.data('hideInterval'));
        myModal.data('hideInterval', setTimeout(function () {
            myModal.modal('hide');
        }, 2500));
    });

    //header,nav 가로 스크롤되도록 설정
    $("nav.navbar,.default-sidebar").css("left", 0 - $(window).scrollLeft());

    //스크롤시
    $(window).on("scroll", function() {
        //header,nav 가로 스크롤되도록 설정
        $("nav.navbar,.default-sidebar").css("left", 0 - $(this).scrollLeft());
    });

    //파일 업로드시 파일명 추출 및 파일삭제 버튼 추가
    $(".file-group input[type='file']").on("change", function(e) {
        var fileObj = $(this).closest(".file-group");
        var fileName = "";
        var fileHtml = "";

        $(fileObj).find("label").css("display","block");
        $(fileObj).find(".file-delete-btn").remove();

        if ($(this).val() != "") {
            if (window.FileReader) {
                //기본 브라우저
                fileName = $(this)[0].files[0].name;
            } else {
                //old IE
                fileName = $(this).val().split('/').pop().split('\\').pop();
            }

            fileHtml += "<button type='button' class='file-delete-btn' onclick='delFile(this);'><span>파일삭제</span></button>";

            $(fileObj).find("label").css("display","none");
            $(fileObj).find("label").after(fileHtml);
        }

        $(fileObj).find(".form-control").val(fileName);
    });

    //pagetype 파라미터 값이 있을 경우 해당 영역으로 스크롤
    if ($(".page-write-area").length > 0) {
        var paramPageType = getURLParamValue(globalFileUrl, "pagetype");

        if (paramPageType != "") {
            var offset = $("#" + paramPageType).offset();

            $("html, body").animate({scrollTop : offset.top - 90}, 400);
        }
    }

    //계정 권한 선택
    if ($(".admin-auth-select").length > 0) {
        setAdminAuthChange($(".admin-auth-select"));
    }

    //계정 비밀번호 변경 체크
    if ($(".admin-pw-chkbox").length > 0) {
        setAdminPwChange($(".admin-pw-chkbox"));
    }

    //통계 검색기간 선택
    if ($(".stats-period-select").length > 0) {
        setStatsPeriodChange($(".stats-period-select"));
    }
    
    //맵에서 레이어창 이동가능하게 설정
    $(".map-wrap .map-layer-area .map-layer").each(function() {
        $(this).draggable({
            containment: ".map-wrap",
            handle: ".map-layer-tit-area"
        }).mousedown(function() {
            var mapLayerObj = $(this);
            var maxIndex = 99;

            $(".map-layer.on").each(function() {
                if (parseInt($(this).attr("data-max-index")) >= maxIndex && mapLayerObj[0] !== $(this)[0]) {
                    maxIndex = parseInt($(this).attr("data-max-index")) + 1;
                }
            });

            $(this).css("z-index", maxIndex);
            $(this).attr("data-max-index", maxIndex);
        });
    });

    //색상 입력창 설정
    $(".color-control").each(function() {
        $(this).spectrum({
            type: "component",
            preferredFormat: "hex",
            showPalette: false,
            showAlpha: false
        });
    });

    //맵에서 노선색상창의 투명도 설정
    $(".opacity-group input[type='range']").each(function () {
        setOpacityChange(this);
    });

    //맵에서 로딩시 탭 내용 설정
    $(".map-tab-area .map-tab-list").each(function() {
        setMapTab($(this).children("li").eq(0));
    });

    //맵에서 탭 클릭시 탭 내용 설정
    $(".map-tab-area .map-tab-list>li").on("click", function() {
        setMapTab($(this));
    });

    //맵에서 노선관리 목록의 항목 클릭시 하위 항목 보이기&숨기기
    $(".map-layer-list li>.map-layer-tit>.view,.map-layer-list li>.map-layer-tit>.name").on("click", function() {
        setRouteListShow(this);
    });

    //맵에서 노선관리 목록의 노선 단일체크&체크해제
    $(".map-layer-list li>.map-layer-tit>input[type='checkbox']").on("click", function() {
        setRouteListCheck(this);
    });
    
    //숫자만 입력
    $("input[type='tel'], input[type='number']").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });
    
    //로그인시 엔터를 누르면 버튼 클릭
    $("#loginForm input").keydown(function(key) {
        if (key.keyCode == 13) {
            location.href = 'new-index.html';
        }
    });
});

//쿠키값 설정하기
function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

//쿠키값 삭제하기
function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

//쿠키값 가져오기
function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
    
    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        
        if (x == cookie_name) {
          return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}

//파라미터 가져오기
function getURLParams(url) {
    var result = {};
    
    url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { 
        result[k] = decodeURIComponent(v); 
    });
    
    return result;
}

//해당 파라미터의 값 가져오기
function getURLParamValue(url, key) {
    var result = "";
    var paramArr = getURLParams(url);
    
    for (var i in paramArr) {
        if (i == key) {
            result = paramArr[i];
        }
    }
    
    return result;
}

//입력한 글자수 출력
function setTextLength(obj) {
	var inputText = $(obj).val();
	var limit = ($(obj).attr("data-text-length") > 0) ? $(obj).attr("data-text-length") : 0;
	
	if (limit > 0) {
		if (inputText.length > limit) {
			$(obj).val(inputText.substr(0, limit));
			inputText = $(obj).val();
			return;
		}
	}
}

//입력한 글자수 가져오기
function getTextLength(str) {
    var len = 0;
    
    for (var i=0; i<str.length; i++) {
        /*if (escape(str.charAt(i)).length == 6) {
            len++;
        }*/
        
        len++;
    }
    
    return len;
}

//modal창 열기 (type : modal창 종류 (alert / confirm), msg : 메시지 내용, fun : 확인 버튼 클릭시 실행할 함수 (함수가 여러개일 경우 세미콜론으로 구분))
function openModal(type, msg, fun) {
    $("#modal-centered-" + type + " .modal-body .modal-body-text").html(msg);
    
    if (fun != "") {
        $("#modal-centered-" + type + " .modal-footer .btn-confirm").removeAttr("onclick");
        $("#modal-centered-" + type + " .modal-footer .btn-confirm").attr("onclick", fun);
    }
    
    $("#modal-centered-" + type + "-btn").trigger("click");
}

//선택한 파일 삭제
function delFile(obj) {
    var fileObj = $(obj).closest(".file-group");
    var fileId = $(fileObj).find("input[type='file']").attr("id");
    var fileName = $(fileObj).find("input[type='file']").attr("name");
    var fileHtml = "";
    
    $(obj).remove();
    $(fileObj).find("label").remove();
    $(fileObj).find(".form-control").val("");
    
    fileHtml += "<label class='file-control-btn'>";
    fileHtml += "    <input type='file' id='" + fileId + "' name='" + fileName + "' class='file-control'>";
    fileHtml += "    <span class='file-control-text'>파일선택</span>";
    fileHtml += "</label>";
    
    $(fileObj).find(".form-control").after(fileHtml);
    
    //파일 업로드시 파일명 추출 및 파일삭제 버튼 추가
    $(".file-group input[type='file']").on("change", function(e) {
        var fileObj = $(this).closest(".file-group");
        var fileName = "";
        var fileHtml = "";

        $(fileObj).find("label").css("display","block");
        $(fileObj).find(".file-delete-btn").remove();

        if ($(this).val() != "") {
            if (window.FileReader) {
                //기본 브라우저
                fileName = $(this)[0].files[0].name;
            } else {
                //old IE
                fileName = $(this).val().split('/').pop().split('\\').pop();
            }

            fileHtml += "<button type='button' class='file-delete-btn' onclick='delFile(this);'><span>파일삭제</span></button>";

            $(fileObj).find("label").css("display","none");
            $(fileObj).find("label").after(fileHtml);
        }

        $(fileObj).find(".form-control").val(fileName);
    });
}

//계정 권한 선택
function setAdminAuthChange(obj) {
    var tableObj = $(obj).closest("table");
    
    if ($(obj).val() == "schoolAdmin") {
        $(tableObj).find(".td-school").find("select").prop("required", true);
        $(tableObj).find(".td-empty").removeClass("on");
        $(tableObj).find(".td-school").addClass("on");
    } else {
        $(tableObj).find(".td-school").find("select").prop("required", false);
        $(tableObj).find(".td-school").removeClass("on");
        $(tableObj).find(".td-empty").addClass("on");
    }
}

//계정 비밀번호 변경 체크
function setAdminPwChange(obj) {
    var tableObj = $(obj).closest("table");
    
    if ($(obj).is(":checked")) {
        $(tableObj).find(".tr-new-pw").find("input[type='password']").prop("required", true);
        $(tableObj).find(".tr-new-pw").addClass("on");
    } else {
        $(tableObj).find(".tr-new-pw").find("input[type='password']").prop("required", false);
        $(tableObj).find(".tr-new-pw").removeClass("on");
    }
}

//설문조사 질문종류 선택
function setSurveyTypeChange(obj) {
    var tableObj = $(obj).closest("table");
    
    $(tableObj).next("table").css("display","none");
    
    if ($(obj).val() == "objective") {
        $(tableObj).next("table").css("display","table");
    }
}

//설문조사 설문문항 질문 옵션추가
function setSurveyOptionInsert(obj) {
    var tableObj = $(obj).closest("table");
    var tableHtml = "";
    
    tableHtml += "<tr>";
    tableHtml += "    <td>";
    tableHtml += "        <input type='text' id='' name='' class='form-control'>";
    tableHtml += "    </td>";
    tableHtml += "    <td>";
    tableHtml += "        <input type='text' id='' name='' class='form-control'>";
    tableHtml += "    </td>";
    tableHtml += "    <td>";
    tableHtml += "        <button type='button' class='btn btn-style03' onclick='setSurveyOptionDelete(this);'><span>삭제</span></button>";
    tableHtml += "    </td>";
    tableHtml += "</tr>";
    
    $(tableObj).children("tbody").append(tableHtml);
}

//설문조사 설문문항 질문 옵션삭제
function setSurveyOptionDelete(obj) {
    var tableObj = $(obj).closest("table");
    
    if ($(tableObj).children("tbody").children("tr").length > 1) {
        $(obj).closest("tr").remove();
    }
}

//통계 검색기간 선택
function setStatsPeriodChange(obj) {
    var tableObj = $(obj).closest("table");
    
    $(tableObj).find(".stats-period-time-area").removeClass("on");
    $(tableObj).find(".stats-period-date-area").removeClass("on");
    
    if ($(obj).val() == "time") {
        $(tableObj).find(".stats-period-time-area").addClass("on");
    } else if ($(obj).val() == "date") {
        $(tableObj).find(".stats-period-date-area").addClass("on");
    }
}

//통계 검색시 차트 그리기
function setStatsSearch(obj) {
    if ($(".stats-chart").length > 0) {
        //차트 초기화
        if ($("#statsChart").length > 0) {
            $("#statsChart").remove();
        }
        
        //차트 데이터 설정
        var statsTargetVal = $(".stats-target-select").val();
        var statsTypeVal = $(".stats-type-select").val();
        var statsPeriodVal = $(".stats-period-select").val();
        var statsPeriodArr = [];
        var statsTypeArr = [];
        var statsTypeJson = {};
        var statsBackgroundColorJson = {};
        var statsBolderColorJson = {};
        var statsIdx = 0;
        
        var statsData = {};
        var chartData = {};
        var chartDatasets = {};
        var chartValue = [];
        var chartLegend = false;
        
        chartData.labels = [];
        chartData.datasets = [];
        
        if (statsTypeVal == "login") {
            //종류가 로그인통계일 경우
            //데이터 가져오는 부분 start
            if (statsPeriodVal == "time") {
                //검색기간이 시간별일 경우
                statsPeriodArr = ['00:00~02:00', '02:00~04:00', '04:00~06:00', '06:00~08:00', '08:00~10:00', '10:00~12:00', '12:00~14:00', '14:00~16:00', '16:00~18:00', '18:00~20:00', '20:00~22:00', '22:00~24:00'];
            } else if (statsPeriodVal == "date") {
                //검색기간이 날짜별일 경우
                statsPeriodArr = ['2023-08-11', '2023-08-13', '2023-08-14', '2023-08-15', '2023-08-16', '2023-08-17'];
            }
            
            $.each(statsPeriodArr, function(key,value) {
                var random = Math.round(Math.random() * 100);

                statsData[value] = random;
            });
            //데이터 가져오는 부분 end
            
            $.each(statsData, function(key,value) {
                chartValue.push(value);
                chartData.labels.push(key);
            });

            chartDatasets.label = "로그인(명)";
            chartDatasets.backgroundColor = 'rgba(7,97,125,0.6)';
            chartDatasets.borderColor = 'rgb(7,97,125)';
            chartDatasets.borderWidth = 1;
            chartDatasets.data = chartValue;

            chartData.datasets.push(chartDatasets);
        } else if (statsTypeVal == "use") {
            //종류가 이용통계일 경우
            //데이터 가져오는 부분 start
            statsTypeArr = ['계정관리', '학교관리', '버스관리', '학생관리', '설문조사관리', '공지사항관리', 'FAQ관리', '문자발송관리', '통계관리', '로그관리'];
            
            if (statsPeriodVal == "time") {
                //검색기간이 시간별일 경우
                statsPeriodArr = ['00:00~02:00', '02:00~04:00', '04:00~06:00', '06:00~08:00', '08:00~10:00', '10:00~12:00', '12:00~14:00', '14:00~16:00', '16:00~18:00', '18:00~20:00', '20:00~22:00', '22:00~24:00'];
            } else if (statsPeriodVal == "date") {
                //검색기간이 날짜별일 경우
                statsPeriodArr = ['2023-08-11', '2023-08-13', '2023-08-14', '2023-08-15', '2023-08-16', '2023-08-17'];
            }
            
            $.each(statsTypeArr, function(key,value) {
                statsData = {};
                
                $.each(statsPeriodArr, function(key2,value2) {
                    var random = Math.round(Math.random() * 100);

                    statsData[value2] = random;
                });
                
                statsTypeJson[value] = statsData;
                statsBackgroundColorJson[value] = chartBackgroundColor[statsIdx];
                statsBolderColorJson[value] = chartBolderColor[statsIdx];
                
                statsIdx++;
            });
            //데이터 가져오는 부분 end
            
            $.each(statsTypeJson, function(key,value) {
                chartDatasets = {};
                chartValue = [];
                
                $.each(value, function(key2,value2) {
                    chartValue.push(value2);
                    
                    if (chartData.labels.indexOf(key2) === -1) {
                        chartData.labels.push(key2);
                    }
                });
                
                chartDatasets.label = key;
                chartDatasets.backgroundColor = statsBackgroundColorJson[key];
                chartDatasets.borderColor = statsBolderColorJson[key];
                chartDatasets.borderWidth = 1;
                chartDatasets.data = chartValue;

                chartData.datasets.push(chartDatasets);
            });
            
            chartLegend = true;
        }
        
        //차트 그리기
        $(".stats-chart").append("<canvas id='statsChart'></canvas>");
        
        statsCtx = document.getElementById('statsChart').getContext('2d');
        statsChart = new Chart(statsCtx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: true
                },
                plugins: {
                    legend: {
                        display: chartLegend,
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'rect',
                            boxWidth: 10,
                            padding: 15
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10
                    }
                },
                animation: {
                    duration: 0
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked:true,
                        ticks: {
                            stepSize: 5
                        },
                        afterDataLimits: (scale) => {
                            scale.max = scale.max * 1.2;
                        }
                    },
                    x: {
                        stacked:true,
                        grid : {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

//학생 등교정류소&하교정류소 설정창 열기 (type: 등교, 하교)
function openModalStudentStation(obj,type) {
    if (type == "등교") {
        $("#modal-student-station .modal-header .modal-title").text("등교정류소 설정");
    } else if (type == "하교") {
        $("#modal-student-station .modal-header .modal-title").text("하교정류소 설정");
    }
    
    $("#modal-student-station-btn").trigger("click");
}

//학생 보호자 설정창 열기 (type: insert, update)
function openModalStudentMapping(obj,type) {    
    $("#modal-student-mapping-btn").trigger("click");
}

//설문조사 설문문항 그룹추가&그룹수정창 열기 (type: insert, update)
function openModalSurveyGroup(obj,type) {
    if (type == "insert") {
        $("#modal-survey-group .modal-header .modal-title").text("설문문항 그룹추가");
    } else if (type == "update") {
        $("#modal-survey-group .modal-header .modal-title").text("설문문항 그룹수정");
    }
    
    $("#modal-survey-group-btn").trigger("click");
}

//설문조사 설문문항 질문추가&질문수정창 열기 (type: insert, update)
function openModalSurveyQuestion(obj,type) {
    if (type == "insert") {
        $("#modal-survey-question .modal-header .modal-title").text("설문문항 질문추가");
    } else if (type == "update") {
        $("#modal-survey-question .modal-header .modal-title").text("설문문항 질문수정");
    }
    
    $("#modal-survey-question-btn").trigger("click");
    
    //설문조사 질문종류 선택
    if ($(".survey-type-select").length > 0) {
        setSurveyTypeChange($(".survey-type-select"));
    }
}

//설문조사 설문응답자창 열기
function openModalSurveyRespondent(obj) {
    $("#modal-survey-respondent-btn").trigger("click");
}

//설문조사 통계창 열기
function openModalSurveyStats(obj) {
    if ($(".survey-chart").length > 0) {
        //차트 초기화
        if ($("#surveyChart").length > 0) {
            $("#surveyChart").remove();
        }
        
        //차트 데이터 설정
        var statsData = {};
        var chartData = {};
        var chartDatasets = {};
        var chartValue = [];
        
        chartData.labels = [];
        chartData.datasets = [];
        
        //데이터 가져오는 부분 start
        statsData['10대'] = 20;
        statsData['20대'] = 16;
        statsData['30대'] = 8;
        statsData['40대'] = 18;
        statsData['50대'] = 6;
        statsData['60대이상'] = 4;
        //데이터 가져오는 부분 end
        
        $.each(statsData, function(key,value) {
            chartValue.push(value);
            chartData.labels.push(key);
        });
        
        chartDatasets.label = "연령대(명)";
        chartDatasets.backgroundColor = 'rgba(7,97,125,0.6)';
        chartDatasets.borderColor = 'rgb(7,97,125)';
        chartDatasets.borderWidth = 1;
        chartDatasets.data = chartValue;
        
        chartData.datasets.push(chartDatasets);
        
        //차트 그리기
        $(".survey-chart").append("<canvas id='surveyChart'></canvas>");
        
        surveyCtx = document.getElementById('surveyChart').getContext('2d');
        surveyChart = new Chart(surveyCtx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: true
                },
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'rect',
                            boxWidth: 10,
                            padding: 15
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10
                    }
                },
                animation: {
                    duration: 0
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked:true,
                        ticks: {
                            stepSize: 5
                        },
                        afterDataLimits: (scale) => {
                            scale.max = scale.max * 1.2;
                        }
                    },
                    x: {
                        stacked:true,
                        grid : {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    $("#modal-survey-stats-btn").trigger("click");
}

//문자발송 연락처창 열기
function openModalMsgsendTels(obj) {
    $("#modal-msgsend-tels-btn").trigger("click");
}

//맵에서 노선색상창의 투명도 설정
function setOpacityChange(obj) {
    $(obj).next("input[type='text']").val($(obj).val());
}

//맵에서 왼쪽 영역 보이기&숨기기
function setMapLeft(obj) {
    if ($(obj).closest(".map-left-area").hasClass("on")) {
        $(obj).closest(".map-left-area").removeClass("on");
    } else {
        $(obj).closest(".map-left-area").addClass("on");
    }
}

//맵에서 탭 내용 설정
function setMapTab(obj) {
    if (obj.length > 0) {
        var dataTabType = obj.attr("data-tab-type");
        var dataTabName = obj.attr("data-tab-name");
        
        obj.parent(".map-tab-list").children("li").removeClass("on");
        obj.addClass("on");
        
        $(".map-tab-item[data-tab-type='" + dataTabType + "']").removeClass("on");
        $(".map-tab-item[data-tab-type='" + dataTabType + "'][data-tab-name='" + dataTabName + "']").addClass("on");
    }
}

//맵에서 노선관리 목록의 항목 클릭시 하위 항목 보이기&숨기기
function setRouteListShow(obj) {
    if ($(obj).parent(".map-layer-tit").next("ul").length > 0) {
        if ($(obj).closest("li").hasClass("on")) {
            $(obj).closest("li").removeClass("on");
        } else {
            $(obj).closest("li").addClass("on");
        }
    }
}

//맵에서 노선관리 목록의 노선 단일체크&체크해제
function setRouteListCheck(obj) {
    if ($(obj).is(":checked")) {
        if ($(".map-left-sub-area").hasClass("on") && $(".map-left-sub-area .map-route-update").hasClass("on")) {
            $(obj).prop("checked", false);
            
            openModal("alert","노선수정창을 닫고 다시 시도해주세요.","");
        } else {
            $(obj).closest(".map-layer-list").find("input[type='checkbox']").not(obj).prop("checked", false);
            
            $(".map-left-sub-area .map-route-update").removeClass("on");
            $(".map-left-sub-area .map-route-info").addClass("on");
            $(".map-left-sub-area").addClass("on");
        }
    } else {
        $(".map-left-sub-area .map-route-info").removeClass("on");
        $(".map-left-sub-area").removeClass("on");
    }
}

//맵에서 노선수정할 경우 정류소 화살표 보이기&숨기기
function setStationArrow() {
    var $tbodyObj = $(".route-update-con-area").find("table").children(".station-list");
    
    if ($tbodyObj.length > 0) {
        var count = parseInt($tbodyObj.children("tr").length);
        
        if (count == 1) {
            $tbodyObj.children("tr").find(".station-arrow-up").addClass("hide");
            $tbodyObj.children("tr").find(".station-arrow-down").addClass("hide");
        } else if (count > 1) {
            $tbodyObj.children("tr").find(".station-arrow-up").removeClass("hide");
            $tbodyObj.children("tr").find(".station-arrow-down").removeClass("hide");
            $tbodyObj.children("tr:first-child").find(".station-arrow-up").addClass("hide");
            $tbodyObj.children("tr:last-child").find(".station-arrow-down").addClass("hide");
        }
    }
}

//맵에서 노선수정할 경우 정류소 추가
function setStationInsert(obj) {
    if ($(obj).hasClass("on")) {
        $(obj).removeClass("on");
    } else {
        $(obj).closest(".map-btn-area").find(".btn-map").removeClass("on");
        $(obj).addClass("on");
        
        var $tbodyObj = $(obj).closest(".route-update-con-area").find("table").children(".station-list");
        
        if ($tbodyObj.length > 0) {
            var count = parseInt($tbodyObj.children("tr").length);
            
            var trHtml = `<tr>
                <td>
                    <div class="station-order">
                        <div class="station-num">${count + 1}</div>
                        <div class="station-arrow">
                            <a href="javascript:void(0);" class="station-arrow-up" onclick="setStationOrder(this,'up');"><i class="ion-arrow-up-b"></i></a>
                            <a href="javascript:void(0);" class="station-arrow-down" onclick="setStationOrder(this,'down');"><i class="ion-arrow-down-b"></i></a>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="text" id="" name="" class="form-control">
                </td>
                <td>
                    <button type="button" class="btn btn-style03" onclick="setStationDelete(this);"><span>삭제</span></button>
                </td>
            </tr>`;
            
            $tbodyObj.append(trHtml);
            
            //맵에서 노선수정할 경우 정류소 화살표 보이기&숨기기
            setStationArrow();
        }
    }
}

//맵에서 노선수정할 경우 정류소 이동
function setStationMove(obj) {
    if ($(obj).hasClass("on")) {
        $(obj).removeClass("on");
    } else {
        $(obj).closest(".map-btn-area").find(".btn-map").removeClass("on");
        $(obj).addClass("on");
    }
}

//맵에서 노선수정할 경우 노선도 편집
function setRouteEdit(obj) {
    if ($(obj).hasClass("on")) {
        $(obj).removeClass("on");
    } else {
        $(obj).closest(".map-btn-area").find(".btn-map").removeClass("on");
        $(obj).addClass("on");
    }
}

//맵에서 노선수정할 경우 정류소 삭제
function setStationDelete(obj) {
    var $trObj = $(obj).closest("tr");
    
    if ($trObj.length > 0) {
        $trObj.remove();
        
        var $tbodyObj = $(".route-update-con-area").find("table").children(".station-list");
        var order = 0;
        
        $tbodyObj.children("tr").each(function() {
            order++;
            $(this).find(".station-num").text(order);
        });
        
        //맵에서 노선수정할 경우 정류소 화살표 보이기&숨기기
        setStationArrow();
    }
}

//맵에서 노선수정할 경우 정류소 순서 변경
function setStationOrder(obj,type) {
    var $trObj = $(obj).closest("tr");
    
    if ($trObj.length > 0) {
        var order = parseInt($trObj.find(".station-num").text());

        if (type == "up") {
            $trObj.prev().before($trObj);
            $trObj.find(".station-num").text(order - 1);
            $trObj.next().find(".station-num").text(order);
        } else if (type == "down") {
            $trObj.next().after($trObj);
            $trObj.find(".station-num").text(order + 1);
            $trObj.prev().find(".station-num").text(order);
        }
        
        //맵에서 노선수정할 경우 정류소 화살표 보이기&숨기기
        setStationArrow();
    }
}

//맵에서 노선수정창 열기
function openRouteUpdate(obj) {
    if ($(".map-left-sub-area").hasClass("on") && $(".map-left-sub-area .map-route-update").hasClass("on")) {
        openModal("alert","노선수정창을 닫고 다시 시도해주세요.","");
    } else if ($(".map-routeinsert-layer").hasClass("on")) {
        openModal("alert","노선추가창을 닫고 다시 시도해주세요.","");
    } else if ($(".map-routecolor-layer").hasClass("on")) {
        openModal("alert","노선색상창을 닫고 다시 시도해주세요.","");
    } else {
        $(".map-layer-list li>.map-layer-tit>input[type='checkbox']").prop("checked", false);
        
        $(".map-left-sub-area .map-route-info").removeClass("on");
        $(".map-left-sub-area .map-route-update").addClass("on");
        $(".map-left-sub-area").addClass("on");
        
        //맵에서 노선수정할 경우 정류소 화살표 보이기&숨기기
        setStationArrow();
    }
}

//맵에서 노선수정창 닫기
function closeRouteUpdate(obj) {
    $(".map-left-sub-area .map-route-update").removeClass("on");
    $(".map-left-sub-area").removeClass("on");
}

//맵에서 레이어창 열기
function openMapLayer(obj,type) {
    var maxIndex = 99;
    
    if (type == "routeinsert" || type == "routecolor") {
        if ($(".map-left-sub-area").hasClass("on") && $(".map-left-sub-area .map-route-update").hasClass("on")) {
            openModal("alert","노선수정창을 닫고 다시 시도해주세요.","");
            
            return false;
        }
    }
    
    $(".map-layer.on").each(function() {
        if (parseInt($(this).attr("data-max-index")) >= maxIndex) {
            maxIndex = parseInt($(this).attr("data-max-index")) + 1;
        }
    });
    
    $(".map-" + type + "-layer").css({top:"", left:""});
    $(".map-" + type + "-layer").css("z-index", maxIndex);
    $(".map-" + type + "-layer").attr("data-max-index", maxIndex);
    
    $(".map-" + type + "-layer").addClass("on");
}

//맵에서 레이어창 닫기
function closeMapLayer(obj) {
    $(obj).closest(".map-layer").removeClass("on");
}

