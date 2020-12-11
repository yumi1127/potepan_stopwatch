(function(){
  'use strict';

  //htmlのクラスからidを取得して、変数に代入
  let timer = document.getElementById('timer');
  let start = document.getElementById('start');
  let stop = document.getElementById('stop');
  let reset = document.getElementById('reset');

  //クリック時の時間を保持するための変数
  let startTime;

  //経過時間を更新するための変数
  let elapsedTime = 0;

  //タイマーのid
  let timerId;

  //タイマーをストップさせて０に戻らないようにするための変数
  let timeToadd = 0;

  //msを分や秒に直すための関数
  function updateTimetText(){
    //分に直す
    let m = Math.floor(elapsedTime / 60000);

    //あまりを秒で表す
    let s = Math.floor(elapsedTime % 60000 / 1000);

    //あまりをミリ秒で表す
    let ms = elapsedTime % 1000;

    //html上で表示の桁数を固定する
    //sliceで−２することでし下二桁を表示する
    m = ('0'+ m).slice(-2);
    s = ('0'+ s).slice(-2);
    ms = ('0'+ ms).slice(-3);

    timer.textContent = m + ':' + s + ':' + ms;
  }

  //再帰的に使える用の関数
  function countUp(){
    //timerID関数はsetTimeoutの返り値になるので代入する
    timerId = setTimeout(function(){
    //経過時刻は現在時刻からスタートボタンを押した時刻を引く
    elapsedTime = Date.now() - startTime + timeToadd;
    updateTimetText();

    //countUp関数自身を呼ぶことで１０ミリ秒ごとに以下の計算を始める
    countUp();
  },10);
};

  //startボタンをクリックした時のイベントを追加
  start.addEventListener('click',function(){
    //現在時刻を示すDate.nowを代入
    startTime = Date.now();
    //再帰的に使えるように関数を作る
    countUp();
  });

  //stopボタンをクリックした時のイベントを追加
  stop.addEventListener('click',function(){
    //タイマーを止めるためにタイマーのIDを作る
    clearTimeout(timerId);
    //タイマーが０に戻るのを回避するために、過去の経過時間を足す
    timeToadd += Date.now() - startTime;
  });

  //リセットボタンをクリックした時のイベントを追加
  reset.addEventListener('click',function(){
    //経過時間を更新するための変数を０にする
    elapsedTime = 0;

    //リセットを押したときに０を代入する
    timeToadd = 0;

    //0になったタイムを表示
    updateTimetText();
  });

})();
