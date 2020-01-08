$(function(){
    var isNewRndItem=false;
    var gameScore=0;
    var maxScore=0;//set score to zero,restart.
    if (localStorage.maxScore){
        maxScore=localStorage.maxScore;
    }
    else {maxScore=0;//set max score
    }
    gameInit()


    function refreshGame(){
        var items= $('.gameBody.row.item');
        for (var i=0; i<items.length;i++){
            items.eq(i).html('').addClass('emptyClass')
        }
        gameScore=0;
        $('#gameScore').html(gameScore);//reset score to 0
        newRndItem();
        newRndItem();
        refreshColor();
        $('#gameOverModal').modal('hide');

    }
    
    function getSideItem(currentItem,direction)
    {var currentItemX=currentItem.attr('x');
    var currentItemY=currentItem.attr('y');
    switch(direction){
        case'left':
        var sideItemX=currentItemX;
        var sideItemY=currentItemY-1;
        break;
        case'right':
        var sideItemX=currentItemX;
        var sideItemY=currentItemY+1;
        break;
        case'up':
        var sideItemX=currentItemX-1;
        var sideItemY=currentItemY;
        break;
        case'down':
        var sideItemX=currentItemX+1;
        var sideItemY=currentItemY;
        break;
    }
    var sideItem=$ ('gameBody.row.x'+sideItemX+'y'+sideItemY);
    return sideItem;
    }

    function itemMove(currentItem,direction){
        var sideItem=getSideItem(currentItem,direction);
         if(sideItem.length=0){}
        else if(sideItem.html()==''){
        sideItem.html(currentItem.html()).removeClass('emptyItem').addClass('nonEmptyItem');
        currentItem.html('').removeClass('nonEmptyItem').addClass('emptyItem');
        itemMove(sideItem, direction);
            isNewRndItem = true;
        }
        else if (sideItem.html()!=currentItem.html()){

        }
        else {(sideItem.html(sideItem.html())*2);
        currentItem.html('').removeClass('nonEmptyItem').addClass('emptyItem')
        gameScore += (sideItem.text() - 0) * 10;
        $('#gameScore').html(gameScore);
        // itemMove(sideItem, direction);
        maxScore = maxScore < gameScore ? gameScore : maxScore;
        $('#maxScore').html(maxScore);
        localStorage.maxScore = maxScore;
        isNewRndItem = true;
        return;}
    }

    function move(direction){
        var nonEmptyItem=$('.gameBody .row .nonEmptyItem');
        if (direction == 'left' || direction == 'up') {
            for (var i = 0; i < nonEmptyItems.length; i++) {
                var currentItem = nonEmptyItems.eq(i);
                itemMove(currentItem, direction);
            }
        } else if (direction == 'right' || direction == 'down') {//如果按下的方向是右或下，则反向遍历非空元素
            for (var i = nonEmptyItems.length - 1; i >= 0; i--) {
                var currentItem = nonEmptyItems.eq(i);
                itemMove(currentItem, direction);
            }
        }

        //是否产生新元素
        if (isNewRndItem) {
            newRndItem();
            refreshColor();
        }
    }
    function isGameOver() {
        //获取所有元素
        var items = $('.gameBody .row .item');
        //获取所有非空元素
        var nonEmptyItems = $('.gameBody .row .nonEmptyItem');
        if (items.length == nonEmptyItems.length) {//所有元素的个数 == 所有非空元素的个数  即没有空元素
            //遍历所有非空元素
            for (var i = 0; i < nonEmptyItems.length; i++) {
                var currentItem = nonEmptyItems.eq(i);
                if (getSideItem(currentItem, 'up').length != 0 && currentItem.html() == getSideItem(currentItem, 'up').html()) {
                    //上边元素存在 且 当前元素中的内容等于上边元素中的内容
                    return;
                } else if (getSideItem(currentItem, 'down').length != 0 && currentItem.html() == getSideItem(currentItem, 'down').html()) {
                    //下边元素存在 且 当前元素中的内容等于下边元素中的内容
                    return;
                } else if (getSideItem(currentItem, 'left').length != 0 && currentItem.html() == getSideItem(currentItem, 'left').html()) {
                    //左边元素存在 且 当前元素中的内容等于左边元素中的内容
                    return;
                } else if (getSideItem(currentItem, 'right').length != 0 && currentItem.html() == getSideItem(currentItem, 'right').html()) {
                    //右边元素存在 且 当前元素中的内容等于右边元素中的内容
                    return;
                }
            }
        } else {
            return;
        }
        $('#gameOverModal').modal('show');
    }
    function gameInit() {
        //初始化分数
        $('#gameScore').html(gameScore);
        //最大分值
        $('#maxScore').html(maxScore);
        //为刷新按钮绑定事件
        $('.refreshBtn').click(refreshGame);
        //随机生成两个新元素
        newRndItem();
        newRndItem();
        //刷新颜色
        refreshColor();
    }

    //随机生成新元素
    function newRndItem() {
        //随机生成新数字
        var newRndArr = [2, 2, 4];
        var newRndNum = newRndArr[getRandom(0, 2)];
        console.log('newRndNum: ' + newRndNum);
        //随机生成新数字的位置
        var emptyItems = $('.gameBody .row .emptyItem');
        var newRndSite = getRandom(0, emptyItems.length - 1);
        emptyItems.eq(newRndSite).html(newRndNum).removeClass('emptyItem').addClass('nonEmptyItem');
    }

    //产生随机数  ，包括min、max
    function getRandom(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    //刷新颜色
    function refreshColor() {
        var items = $('.gameBody .item');
        for (var i = 0; i < items.length; i++) {
            // console.log(items.eq(i).parent().index());
            switch (items.eq(i).html()) {
                case '':
                    items.eq(i).css('background', '');
                    break;
                case '2':
                    items.eq(i).css('background', 'rgb(250, 225, 188)');
                    break;
                case '4':
                    items.eq(i).css('background', 'rgb(202, 240, 240)');
                    break;
                case '8':
                    items.eq(i).css('background', 'rgb(117, 231, 193)');
                    break;
                case '16':
                    items.eq(i).css('background', 'rgb(240, 132, 132)');
                    break;
                case '32':
                    items.eq(i).css('background', 'rgb(181, 240, 181)');
                    break;
                case '64':
                    items.eq(i).css('background', 'rgb(182, 210, 246)');
                    break;
                case '128':
                    items.eq(i).css('background', 'rgb(255, 207, 126)');
                    break;
                case '256':
                    items.eq(i).css('background', 'rgb(250, 216, 216)');
                    break;
                case '512':
                    items.eq(i).css('background', 'rgb(124, 183, 231)');
                    break;
                case '1024':
                    items.eq(i).css('background', 'rgb(225, 219, 215)');
                    break;
                case '2048':
                    items.eq(i).css('background', 'rgb(221, 160, 221)');
                    break;
                case '4096':
                    items.eq(i).css('background', 'rgb(250, 139, 176)');
                    break;
            }
        }
    }

    // 电脑的方向键监听事件
    $('body').keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                // left
                console.log('left');
                isNewRndItem = false;
                move('left');
                isGameOver();
                break;
            case 38:
                // up
                console.log('up');
                isNewRndItem = false;
                move('up');
                isGameOver();
                break;
            case 39:
                // right
                console.log('right');
                isNewRndItem = false;
                move('right');
                isGameOver();
                break;
            case 40:
                // down
                console.log('down');
                isNewRndItem = false;
                move('down');
                isGameOver();
                break;
        }
    });

});
