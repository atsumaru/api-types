# api-types

RPGアツマールのゲームプレイヤー実行時に参照可能なグローバルオブジェクト`RPGAtsumaru`の型定義です。

## typescriptのプロジェクトで使用する

コマンドライン上で以下を実行します。
実行にはnpm([https://www.npmjs.com/](https://www.npmjs.com/))が必要です。

```bash
npm install -D atsumaru/api-types
```

次に`tsconfig.json`の`typeRoots`を以下に設定します。`typeRoots`以外の項目は省略して表記しています。

```json
{
    "compilerOptions": {
        "typeRoots": ["node_modules/@types", "node_modules/@atsumaru/api-types"]
    }
}
```
