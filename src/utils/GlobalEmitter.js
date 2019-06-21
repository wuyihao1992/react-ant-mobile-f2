/**
 * 全局事件中心
*/

/**
 * 使用方法
 *
   1.先发布后订阅
   Event.trigger( 'click', 1 );
   Event.listen( 'click', function( a ){
      console.log( a ); // 输出：1
   });
   2.使用命名空间
   Event.create( 'namespace1' ).listen( 'click', function( a ){
      console.log( a ); // 输出：1
   });
   Event.create( 'namespace1' ).trigger( 'click', 1 );
   Event.create( 'namespace2' ).listen( 'click', function( a ){
      console.log( a ); // 输出：2
   });
   Event.create( 'namespace2' ).trigger( 'click', 2 );
 */

/**
 * 旧页面使用请参考 添加合同和合同列表
 * function/contract/editContractNew.js 和 function/contract/listContract.js
 */

if (!global.GlobalEmitter) {
  global.GlobalEmitter = (function(){
    var Event,
      _default = 'default';
    Event = function(){
      var _listen,
        _trigger,
        _remove,
        _getNamespace,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {},
        _create,
        each = function( ary, fn ){
          var ret;
          for ( var i = 0, l = ary.length; i < l; i++ ){
            var n = ary[i];
            ret = fn.call( n, i, n);
          }
          return ret;
        };
      _listen = function( key, fn, cache ){
        if ( !cache[ key ] ){
          cache[ key ] = [];
          cache[ key ].offlineStack = []; //离线事件数组
        }
        cache[key].push( fn );
      };
      _remove = function( key, cache ,fn){
        if ( cache[ key ] ){
          if( fn ){
            for( var i = cache[ key ].length; i >= 0; i-- ){
              if( cache[ key ][i] === fn ){
                cache[ key ].splice( i, 1 );
              }
            }
          }else{
            cache[ key ] = [];
            cache[ key ].offlineStack = []; //离线事件数组
          }
        }
      };
      _trigger = function(){
        var cache = _shift.call(arguments),
          key = _shift.call(arguments),
          args = arguments,
          _self = this,
          ret,
          stack = cache[ key ];
        if ( !stack || !stack.length ){
          return;
        }
        return each( stack, function(){
          return this.apply( _self, args );
        });
      };
      _create = function( namespace ){
        namespace = namespace || _default;
        var cache = {},
          // offlineStack = [], // 离线事件
          ret = {
            listen: function( key, fn, last ){
              _listen( key, fn, cache );
              var offlineStack = cache[ key ].offlineStack;
              if ( last === 'last' ){
                offlineStack.length && offlineStack.pop()();
              }else{
                each( offlineStack, function(){
                  this();
                });
              }
              cache[ key ].offlineStack = []; //清空离线事件数组
              // offlineStack = null;
            },
            one: function( key, fn, last ){
              _remove( key, cache );
              this.listen( key, fn ,last );
            },
            remove: function( key, fn ){
              _remove( key, cache ,fn);
            },
            trigger: function(){
              var fn,
                args,
                _self = this;
              _unshift.call( arguments, cache );
              args = arguments;
              fn = function(){
                return _trigger.apply( _self, args );
              };
              if ( !cache[ args[1] ] ) { //当前事件 没有初始化，则初始化并推入离线数组
                cache[ args[1] ] = [];
                cache[ args[1] ].offlineStack = [ fn ];

              } else if (cache[ args[1] ].length === 0 ){ //当前事件 没有绑定回调，则推入离线事件数组
                return cache[ args[1] ].offlineStack.push( fn );
              }
              return fn();
            }
          };
        return namespace ?
          ( namespaceCache[ namespace ] ? namespaceCache[ namespace ] :
            namespaceCache[ namespace ] = ret )
          : ret;
      };
      _getNamespace = function( namespace ){
        return namespaceCache[ namespace ]
      }
      return {
        create: _create,
        getNamespace: _getNamespace,
        one: function( key,fn, last ){
          var event = this.create( );
          event.one( key,fn,last );
        },
        remove: function( key,fn ){
          var event = this.create( );
          event.remove( key,fn );
        },
        listen: function( key, fn, last ){
          var event = this.create( );
          event.listen( key, fn, last );
        },
        trigger: function(){
          var event = this.create( );
          event.trigger.apply( this, arguments );
        }
      };
    }();
    return Event;
  })();
}
