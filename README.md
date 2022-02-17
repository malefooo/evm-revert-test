# evm-revert-test

### 安装依赖
```
npm install
```

### 配置环境
hardhat.config.ts 中按规则配置需要的测试环境

### 运行 按四种情况测试
```
npx hardhat run scripts/test.ts --network [your config]
```

### 运行 按引用深度测试
修改 scripts 目录下 new_test.ts 文件中 length 变量（代表合约引用深度）
```
npx hardhat run scripts/new_test.ts --network [your config]
```

### 单元测试（测试结果更直观，但建议仅本地节点使用, 网路节点会引起超时错误）
```
npx hardhat test --network [your local config]
```