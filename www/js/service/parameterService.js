// パラメータ関連サービス
onsModule.factory('ParameterService', function() {
  var answerNumList = [];//回答した選択のリスト
  var parameterStatus = null;//パラメータリスト

  return {
    //回答選択リストを返す
    getAnsNumList: function() {
      return answerNumList;
    },

    //回答選択リストを更新する
    updateAnsNumList: function(indexNum,selectNum) {
      answerNumList[indexNum] = selectNum;
    },

    //パラメータリスト初期化
    initParamStatus: function(paramList) {
      var paramObj = {};
      for (paramKey in paramList) {
        if(paramKey == "default") {
          //デフォルト値は1に初期化
          paramObj[paramKey] = 1;
        } else {
          //デフォルト値以外のパラメータは0に初期化
          paramObj[paramKey] = 0;
        }
      }
      parameterStatus = paramObj;
    },

    //パラメータリストを返す
    getParamStatus: function() {
      return parameterStatus;
    },

    //パラメータリストを更新する(質問リスト,回答選択リスト)
    updateParameter: function(questionList) {
      for(i = 0, iLen = answerNumList.length; i < iLen ;i++) {
        //初めの回答選択から順にパラメータを加減する
        var selectNum = answerNumList[i];//選択した回答番号
        var updateParamList = questionList[i].updateParamList;//質問ごとパラメータ加減用データ
        var parameter = updateParamList[parseFloat(selectNum)];//更新するパラメータデータ
        for(key in parameter) {
          var newStatus = parameterStatus[key] + parseFloat(parameter[key]);//更新用Newデータ
          parameterStatus[key] = newStatus;//データを更新
        }
      }
    },

    //役職ポイントから役職名を返す
    getDefineRole: function(jinroRolePointList) {
      var defineRoleName = "";
      var maxPoint = -100;//最高ポイント値
      for(key in jinroRolePointList) {
        if( maxPoint < jinroRolePointList[key] ) {
          //最高ポイント値を順に比較し、最高ポイントの役職名を返す
          defineRoleName = key;
          maxPoint = jinroRolePointList[key];
        }
      }
      return defineRoleName;
    }
  }//return close
})