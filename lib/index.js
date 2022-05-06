"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SuggestionService = (function () {
  function SuggestionService(loadData, max, displayField, valueField) {
    if (max === void 0) { max = 20; }
    if (displayField === void 0) { displayField = ''; }
    if (valueField === void 0) { valueField = ''; }
    this.loadData = loadData;
    this.max = max;
    this.displayField = displayField;
    this.valueField = valueField;
    this.load = this.load.bind(this);
  }
  SuggestionService.prototype.load = function (keyword, last, excludingValues) {
    var _this = this;
    if (keyword.length > 1 && keyword.startsWith(last.keyword) &&
      last.list.length < this.max) {
      var list = void 0;
      keyword = keyword.toUpperCase();
      if (this.displayField !== '') {
        list = last.list.filter(function (item) { return item[_this.displayField].toUpperCase().includes(keyword); });
      }
      else {
        list = last.list.filter(function (item) { return String(item).toUpperCase().includes(keyword); });
      }
      return Promise.resolve({ list: list, last: last });
    }
    else {
      return this.loadData(keyword, this.max).then(function (list) {
        if (excludingValues && excludingValues.length > 0) {
          if (_this.valueField !== '') {
            list = list.filter(function (obj) { return !excludingValues.find(function (item) { return obj[_this.valueField] === item; }); });
          }
          else {
            list = list.filter(function (obj) { return !excludingValues.find(function (item) { return obj === item; }); });
          }
        }
        last.keyword = keyword;
        last.list = list;
        return { list: list, last: last };
      });
    }
  };
  return SuggestionService;
}());
exports.SuggestionService = SuggestionService;
