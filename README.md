## flappy bird 微信小游戏

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   ├── pipeline.js                        // 管道类
│   └── index.js                           // 管道集合类
├── player
│   └── index.js                           // 小鸟类
├── runtime
│   ├── background                         // 背景相关
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```