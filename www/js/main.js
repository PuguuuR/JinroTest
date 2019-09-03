//angular module(onsenUI)の定義
var onsModule = ons.bootstrap(['onsen'])

//コントローラー定義

//トップページのコントローラー
onsModule.controller('topCtrl', function() {
  this.gameStart = function(){
    mainNavigator.pushPage('page/game.html');//ゲーム画面に遷移
  }
})

//ゲームページのコントローラー
onsModule.controller('gameCtrl',function(CsvDataService,ParameterService) {

  var gameCl = this;//thisをgameClに退避
  gameCl.data = {};
  var questionList = null;//質問データ
  init();//データ初期化
  
  //回答選択時
  this.nextQ = function(selectNum) {
    console.log(selectNum + " :selected");//debug
    var currentQNum = gameCl.data.currentNum;
    ParameterService.updateAnsNumList(currentQNum,selectNum);
    
    if(currentQNum + 1 < questionList.length) {
      //次の質問へデータ更新
      gameCl.data.currentNum++;//次の番号へ
      questioninit();
    } else {
      //最後の質問回答後
      var ansList = ParameterService.getAnsNumList();//回答選択リスト
      var paramList = CsvDataService.getParameterList();//パラメータ一覧取得
      ParameterService.initParamStatus(paramList);//パラメータ初期化
      ParameterService.updateParameter(questionList,ansList);//パラメータ更新
      var paramStatus = ParameterService.getParamStatus();//パラメータリスト取得
      console.log(paramStatus);//debug
      //役職ポイントを計算する
      var jinroRolePointList = CsvDataService.getJinroRoleParam(paramStatus);
      console.log(jinroRolePointList);//debug
      var resultRoleName = ParameterService.getDefineRole(jinroRolePointList);//適正役職名
      console.log("適正役職：" + resultRoleName);//debug
      //結果表示画面へ遷移
      mainNavigator.pushPage('page/result.html',
      {data: {roleName: resultRoleName,
              rolePoint: jinroRolePointList}});
    }
  }

  //closeボタンがクリックされたらトップページへ戻る
  this.backTop = function(){
      mainNavigator.pushPage('page/top.html');
  };

  function init() {
    //データ初期化
    gameCl.data.currentNum = 0;//現在の質問番号を初期化しバインディング
    questionList = CsvDataService.getQuestionList();//質問リスト初期化
    //console.log(questionList);//debug
    gameCl.data.totalNum = questionList.length;//全質問数をバインディング
    questioninit();
  }

  function questioninit() {
    //現在の質問データ更新
    var currentQ = questionList[gameCl.data.currentNum].question;
    var currentA = questionList[gameCl.data.currentNum].answerList;
    console.log(currentQ);//debug
    console.log(currentA);//debug
    gameCl.data.question =  currentQ;//現在の質問をバインディング
    gameCl.data.answer = currentA;//現在の回答をバインディング
  }
})

onsModule.controller('resultCtrl', function() {
  var takeOverData = mainNavigator.topPage.data;//前画面の情報を引き継ぐ(roleName,rolePoint)
  this.roleName = takeOverData.roleName;//役職名をバインディング
  this.backTop = function(){
    mainNavigator.pushPage('page/top.html');//トップへ戻る
  }
})

;//コントローラー定義Close

//アプリ起動時に初めに呼ばれる関数
ons.ready(function() {
  console.log("Onsen UI is ready!");
});

//iPhoneXの場合の画面調整
if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}