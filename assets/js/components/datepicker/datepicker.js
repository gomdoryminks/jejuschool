(function ($) {

    'use strict';
	
    // ------------------------------------------------------- //
    // Datepicker
    // ------------------------------------------------------ //	
	$(function () {
        //언어를 한국어로 설정
        moment.locale('ko');
        
        //일자
        $(".date-control").each(function() {
            $(this).datepicker({
                language: "ko", //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
                format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
                autoclose : true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
                todayHighlight : true, //오늘 날짜에 하이라이팅 기능 기본값 :false
                orientation: 'bottom center', //달력이 노출되는 위치 설정
                templates : {
                    leftArrow: '<i class="la la-angle-left"></i>',
                    rightArrow: '<i class="la la-angle-right"></i>'
                } //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
            });
        });
        
        //시작일자
        $(".start-date-control").each(function() {
            $(this).datepicker({
                language: "ko", //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
                format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
                autoclose : true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
                todayHighlight : true, //오늘 날짜에 하이라이팅 기능 기본값 :false
                orientation: 'bottom center', //달력이 노출되는 위치 설정
                templates : {
                    leftArrow: '<i class="la la-angle-left"></i>',
                    rightArrow: '<i class="la la-angle-right"></i>'
                } //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
            }).on("changeDate", function(e) {
                var startDate = new Date(e.date.valueOf());
                
                $(e.target).siblings(".end-date-control").datepicker('setStartDate',startDate);
            });
        });
        
        //종료일자
        $(".end-date-control").each(function() {
            $(this).datepicker({
                language: "ko", //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
                format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
                autoclose : true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
                todayHighlight : true, //오늘 날짜에 하이라이팅 기능 기본값 :false
                orientation: 'bottom center', //달력이 노출되는 위치 설정
                templates : {
                    leftArrow: '<i class="la la-angle-left"></i>',
                    rightArrow: '<i class="la la-angle-right"></i>'
                } //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
            }).on("changeDate", function(e) {
                var endDate = new Date(e.date.valueOf());
                
                $(e.target).siblings(".start-date-control").datepicker('setEndDate',endDate);
            });
        });
	});
	
})(jQuery);