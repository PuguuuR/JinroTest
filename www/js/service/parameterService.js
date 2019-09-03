// パラメータ関連サービス
onsModule.factory('ParameterService', function() {
  var answerNumList = [];//回答した選択のリスト

  return {
    //回答選択リストを返す
    getAnsNumList: function() {
      return answerNumList;
    },

    updateAnsNumList: function(indexNum,selectNum) {
      //回答選択リストを更新する
      answerNumList[indexNum] = selectNum;
    }

  }//return close
})