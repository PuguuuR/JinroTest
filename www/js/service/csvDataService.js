//csvデータ用サービス
onsModule.factory('CsvDataService', function() {
  return {
    
    //csvから質問リストを取得する
    getQuestionList: function() {
      var allData = [];// 読み込んだデータを格納する配列
      var linesData = getDataFromCsvBase("data/questionList.csv");//各質問ごと(改行ごと)データ
      
      for (i = 1,iLen = linesData.length; i < iLen; i++) {
        //1行ごとに区切り文字で配列データを取得(1行目はタイトルなのでスキップ)
        var splitData = linesData[i].split(",");

        //オブジェクトにデータを格納
        //question:質問、answerList:回答、updateParamList:回答ごとのパラメータ
        var objData = {};//データ用オブジェクトを定義
        if(splitData[3] == "") {
          //2択質問の場合
          objData["question"] = splitData[0];
          objData["answerList"] = [splitData[1],splitData[2]];
        } else {
          //3択質問の場合
          objData["question"] = splitData[0];
          objData["answerList"] = [splitData[1],splitData[2],splitData[3]];
        }

        //回答パラメータ作成
        var objParam = [];
        //パラメータリストをCSVから変換
        for (j = 4,jLen = splitData.length; j < jLen; j++) {
          var param = splitData[j].split("|");
          var objParamCore = {};
          for (k = 0,kLen = param.length; k < kLen; k++) {
            var paramCore = param[k].split(":");
            var paramKey = paramCore[0];
            var paramValue = paramCore[1];
            //パラメータ名と値のオブジェクトを作成
            objParamCore[paramKey] = paramValue;
          }
          objParam.push(objParamCore);
        }
        objData['updateParamList'] = objParam;//パラメータオブジェクトをデータオブジェクトに格納
        allData.push(objData);//配列にデータオブジェクトを格納
      }
      return allData;
    },

    //test
    getHoge : function() {
      return "hoge";
    }

  }//return close

  //指定したCSVを込みこんで改行ごとデータを返す
  function getDataFromCsvBase(csvUrl) {
    var request = new XMLHttpRequest();
    request.open("get", csvUrl, false);
    request.send(null);
    var csvData = request.responseText;// 読み込んだCSVデータ
    var lines = csvData.split("\r\n");// CSVの全行を取得(改行ごとの配列データ)
    return lines;
  }
});