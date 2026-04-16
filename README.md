# 测测关系浓度 Demo

这是一个纯前端静态原型，用同一套关系题评估两个人的关系浓度，并在结果中提示友情、照顾、义气、搭子感、现实协作和升温信号。

## 访问网址
[https://hrhou929.github.io/cece/](https://hrhou929.github.io/cece/)

## 运行方式

直接打开 `index.html`，或在当前目录启动本地服务：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/
```

## Demo 功能

- 100 道原创中文场景题，每次作答抽取 40 题。
- 15 个维度：好感度、默契度、信任度、陪伴感、安全感、投入度、情绪牵引、边界优先级、照顾感、老派义气、潮流同频、共同成长、现实协作、自主空间、互惠感。
- 关系类型不局限在爱情，也覆盖高质量友情、家人式照顾、老派义气、潮流搭子、现实协作和共同成长等关系气质。
- 单人报告：先生成自己的关系画像和邀请链接。
- 双人报告：朋友用邀请链接答完后，合并双方答案并生成关系浓度、友情基础、升温信号和节奏同步。
- 预写分析：结果文案全部内置在前端规则里，生成报告时直接展示，不调用任何 LLM 或后端接口。
- 示例模式：可以直接查看一组双人结果。
- Story Mirror：根据结果匹配一个文学人物关系参照，并生成原创 SVG 人物剪影。

## 评分说明

友情基础由信任、安全、陪伴、互惠、照顾和投入等维度共同构成；升温信号只是其中一类关系气质，不会被当作唯一结论。Demo 不直接判断“谁喜欢谁”，只展示共同画像和节奏同步，避免把娱乐测试做成关系审判。

正式上线时建议把邀请链接改成后端短码，避免把答案直接编码在 URL 中。

## 形象图说明

结果页的人物形象图是本地生成的原创 SVG 剪影，只表达关系气质，不使用官方剧照、演员照片或受版权保护的角色图片。如果后续想使用网络公开图片，需要逐张确认来源授权和署名要求。

## 参考方向

- [Inclusion of Other in the Self Scale](https://sparqtools.org/mobility-measure/inclusion-of-other-in-the-self-ios-scale/): 亲密关系中的自我和他者交叠。
- [Relationship Closeness Inventory](https://www.cmu.edu/common-cold-project/measures-by-study/psychological-and-social-constructs/marital-quality-measures/relationship-closeness.html): 频率、多样性和影响强度。
- [Friendship Quality Questionnaire](https://pmc.ncbi.nlm.nih.gov/articles/PMC5761066/): 陪伴、帮助、亲密、安全和冲突修复等友情质量维度。
- [Sternberg Triangular Theory of Love](https://as.cornell.edu/news/triangular-theory): 亲密、激情和承诺三角结构。
- [Experiences in Close Relationships](https://labs.psychology.illinois.edu/~rcfraley/measures/relstructures.htm): 亲密关系中的焦虑和回避倾向。

本 demo 的题目和结果文案是原创转译，不复制学术量表题项，不应用于诊断。
