String.prototype.trunc = function(n){
  return this.substr(0,n-1)+(this.length>n?'…':'');
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
