记录写此项目时遇到的问题：
1、使用项目中图标为自定义图标，使用时需在public/index.html中引入css文件。
2、全局改写的element样式放入main.ts文件中，全局应用，全局使用的css样式在vue.config配置中配置。
3、全局components中的组件已在main.ts文件中全局注册过，写时不需要再引入注册。
4、fetch调用接口时，记得启动服务器：NeteaseCloudMusicApi文件。