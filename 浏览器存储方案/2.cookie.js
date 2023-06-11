 //  为了辨别用户身份而存储在本地用户终端上的数据
 //  分为内存cooike（浏览器维护，浏览器关闭消失）和硬盘cookie（有过期时间）
 /**
  * maxAge: 过期时间秒钟
  * expires: UTC
  * Domain：指定哪些主机接受cookie，不指定默认是origin
  * path: 设置路径
  * 
  * 删除cookie： document.cookie = 'name=why; max-age = 0'（httpOnly：true）
  */

 /**
  * 缺点
  * 1.附加到每一次的请求中
  * 2.明文传输
  * 3.大小限制4kb
  * 4.cookie验证登录需要手动
  */