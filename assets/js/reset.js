$(function() {
    //IE일 경우 강제로 페이지 이동
    var agent = navigator.userAgent.toLowerCase();

    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
        location.href = "https://support.microsoft.com/ko-kr/office/microsoft-edge%ec%97%90%ec%84%9c-%ec%9d%b4-%ec%9b%b9-%ec%82%ac%ec%9d%b4%ed%8a%b8%eb%a5%bc-%eb%b3%b4%eb%8a%94-%ea%b2%83%ec%9d%b4-%ec%a2%8b%ec%8a%b5%eb%8b%88%eb%8b%a4-160fa918-d581-4932-9e4e-1075c4713595?ui=ko-kr&rs=ko-kr&ad=kr";
    }
});

