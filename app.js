const DIMENSIONS = [
  { key: "affection", label: "好感度" },
  { key: "resonance", label: "默契度" },
  { key: "trust", label: "信任度" },
  { key: "companionship", label: "陪伴感" },
  { key: "safety", label: "安全感" },
  { key: "investment", label: "投入度" },
  { key: "spark", label: "情绪牵引" },
  { key: "exclusivity", label: "边界优先级" },
  { key: "care", label: "照顾感" },
  { key: "loyalty", label: "老派义气" },
  { key: "trendFit", label: "潮流同频" },
  { key: "growth", label: "共同成长" },
  { key: "practicality", label: "现实协作" },
  { key: "autonomy", label: "自主空间" },
  { key: "reciprocity", label: "互惠感" },
];

const QUESTIONS_PER_RUN = 40;

const QUESTION_BANK = [
  {
    text: "和 TA 相处结束后，我通常觉得被充电，而不是被消耗。",
    theme: "friendship base",
    weights: { affection: 1.2, safety: 0.7, companionship: 0.8 },
  },
  {
    text: "遇到很小的趣事，我也会想顺手发给 TA。",
    theme: "daily pull",
    weights: { companionship: 1, investment: 0.8, affection: 0.7 },
  },
  {
    text: "在 TA 面前，我不用整理人设，也不用一直表现得很稳定。",
    theme: "safe self",
    weights: { safety: 1.2, trust: 1 },
  },
  {
    text: "TA 沉默、开心或不对劲时，我大多能猜到原因。",
    theme: "mutual reading",
    weights: { resonance: 1.2, trust: 0.5 },
  },
  {
    text: "真的遇到麻烦时，我愿意向 TA 开口求助。",
    theme: "trust",
    weights: { trust: 1.2, investment: 0.4 },
  },
  {
    text: "即使我和 TA 意见不同，也不太担心 TA 会否定我这个人。",
    theme: "low pressure",
    weights: { safety: 1.2, resonance: 0.5 },
  },
  {
    text: "我们一段时间没联系，我也相信这段关系没有坏掉。",
    theme: "stable bond",
    weights: { safety: 1, trust: 0.7 },
  },
  {
    text: "如果 TA 和另一个人突然很亲近，我会忍不住比较自己和那个人。",
    theme: "special attention",
    weights: { exclusivity: 1.2, spark: 0.5, safety: -0.35 },
  },
  {
    text: "看到 TA 的消息时，我的情绪会明显亮一下。",
    theme: "emotional lift",
    weights: { spark: 1.1, affection: 0.8, investment: 0.5 },
  },
  {
    text: "如果 TA 临时约我，我会愿意调整一部分原本的安排。",
    theme: "effort",
    weights: { investment: 1, companionship: 0.5 },
  },
  {
    text: "我会记得 TA 的小偏好，比如吃什么、怕什么、最近在意什么。",
    theme: "attention",
    weights: { investment: 0.8, affection: 0.8, resonance: 0.4 },
  },
  {
    text: "我期待和 TA 有只有我们知道的梗、秘密或固定仪式。",
    theme: "private world",
    weights: { trust: 0.5, exclusivity: 0.8, spark: 0.6, companionship: 0.6 },
  },
  {
    text: "在重要时刻，我希望 TA 会优先想到我。",
    theme: "priority",
    weights: { exclusivity: 1, investment: 0.7, affection: 0.4 },
  },
  {
    text: "想象 TA 以后不在我的生活里，我会觉得明显空了一块。",
    theme: "presence",
    weights: { companionship: 1.2, investment: 0.7, affection: 0.7 },
  },
  {
    text: "我们有不舒服或小冲突时，比较能说开，而不是一直假装没事。",
    theme: "repair",
    weights: { trust: 0.7, safety: 0.8, resonance: 0.8 },
  },
  {
    text: "我愿意在 TA 面前展现脆弱、幼稚或没那么体面的一面。",
    theme: "vulnerability",
    weights: { trust: 1.2, safety: 0.8 },
  },
  {
    text: "比起一群人一起玩，我会更期待和 TA 单独相处。",
    theme: "one on one",
    weights: { spark: 1.1, exclusivity: 0.5, resonance: 0.4 },
  },
  {
    text: "TA 对我的评价，会比较容易影响我当天的心情。",
    theme: "emotional gravity",
    weights: { spark: 0.7, investment: 0.6, exclusivity: 0.6, safety: -0.2 },
  },
  {
    text: "我觉得我们在生活节奏、价值选择或未来方向上，有继续同行的可能。",
    theme: "long view",
    weights: { companionship: 0.9, investment: 0.8, safety: 0.5 },
  },
  {
    text: "如果这段关系需要被更认真地看见，我更想慢慢确认，而不是马上逃开。",
    theme: "definition",
    weights: { investment: 0.8, safety: 0.5, spark: 0.4, trust: 0.5 },
  },
  {
    text: "和 TA 相处时，我经常担心自己说错话或让 TA 失望。",
    theme: "reverse safety",
    weights: { safety: -1, trust: -0.5 },
  },
  {
    text: "我们之间常常一方很热、一方很冷，让关系节奏有点不稳。",
    theme: "reverse rhythm",
    weights: { resonance: -0.8, safety: -0.6, trust: -0.4 },
  },
  {
    text: "我和 TA 可以直接说“我今天不想聊”，关系也不会因此变僵。",
    theme: "boundary",
    weights: { safety: 0.9, trust: 0.8, resonance: 0.4 },
  },
  {
    text: "TA 有新的圈子或新计划时，我大多能替 TA 开心，而不是只感到被落下。",
    theme: "autonomy",
    weights: { safety: 0.9, trust: 0.5, exclusivity: -0.6 },
  },
  {
    text: "我愿意认真听 TA 重复讲一件烦心事，即使我已经知道大概内容。",
    theme: "emotional labor",
    weights: { companionship: 0.8, investment: 0.9, affection: 0.5 },
  },
  {
    text: "TA 给我建议时，我通常感觉被尊重，而不是被管教。",
    theme: "respect",
    weights: { trust: 0.8, safety: 0.8, resonance: 0.5 },
  },
  {
    text: "我们能自然地开玩笑，也知道哪些玩笑不该越界。",
    theme: "humor boundary",
    weights: { resonance: 0.9, safety: 0.7, trust: 0.4 },
  },
  {
    text: "当我取得好事时，我会很想让 TA 第一个知道。",
    theme: "celebration",
    weights: { affection: 0.8, investment: 0.7, companionship: 0.5 },
  },
  {
    text: "如果 TA 暂时没有回消息，我不太会立刻脑补关系出了问题。",
    theme: "message security",
    weights: { safety: 1.1, trust: 0.7, spark: -0.2 },
  },
  {
    text: "我们能把钱、时间、帮忙这些现实问题说清楚，而不是靠猜。",
    theme: "practical clarity",
    weights: { trust: 0.8, resonance: 0.6, safety: 0.6 },
  },
  {
    text: "我会想把 TA 介绍给我重要的朋友或生活圈。",
    theme: "life integration",
    weights: { companionship: 0.8, investment: 0.8, affection: 0.5 },
  },
  {
    text: "TA 低落时，我能陪着 TA，但不觉得自己必须负责拯救 TA。",
    theme: "care boundary",
    weights: { safety: 0.8, trust: 0.5, investment: 0.5, exclusivity: -0.3 },
  },
  {
    text: "我们对彼此的缺点有基本了解，但不会总拿这些缺点攻击对方。",
    theme: "acceptance",
    weights: { trust: 0.9, safety: 0.9, resonance: 0.4 },
  },
  {
    text: "如果我临时拒绝 TA 的邀请，我相信 TA 能理解我的处境。",
    theme: "refusal safety",
    weights: { safety: 1.1, trust: 0.7 },
  },
  {
    text: "我有时会在意 TA 是否把我放在一个比较特别的位置。",
    theme: "special position",
    weights: { exclusivity: 0.9, spark: 0.5, investment: 0.3 },
  },
  {
    text: "我们能在各自忙碌时保持低频但稳定的联系。",
    theme: "low frequency stability",
    weights: { companionship: 0.6, trust: 0.8, safety: 0.8 },
  },
  {
    text: "和 TA 相处时，我不会总觉得自己在单方面付出。",
    theme: "reciprocity",
    weights: { reciprocity: 1, investment: 0.6, safety: 0.5, trust: 0.4 },
  },
  {
    text: "我会留意 TA 的边界，不会用“关系好”当理由要求 TA 必须配合我。",
    theme: "boundary respect",
    weights: { trust: 0.8, safety: 0.8, investment: 0.4 },
  },
  {
    text: "如果 TA 对我忽冷忽热，我会明显被牵动，甚至影响自己的安排。",
    theme: "pull instability",
    weights: { spark: 0.7, exclusivity: 0.6, safety: -0.6, resonance: -0.3 },
  },
  {
    text: "我觉得我们即使关系变得更近，也能保留各自的生活和选择。",
    theme: "stable closeness",
    weights: { safety: 0.9, trust: 0.7, companionship: 0.5, exclusivity: -0.2 },
  },
  {
    text: "TA 生病或状态差时，我会自然留意 TA 有没有吃饭休息，而不是只说一句保重。",
    theme: "family-like care",
    weights: { care: 1.1, investment: 0.6, companionship: 0.5 },
  },
  {
    text: "我能接受 TA 把我当作“自己人”，但不把我当作情绪垃圾桶。",
    theme: "care boundary",
    weights: { care: 0.7, safety: 0.8, autonomy: 0.8 },
  },
  {
    text: "我们之间有一种不用天天聊天、但关键时刻会站出来的默契。",
    theme: "old-school loyalty",
    weights: { loyalty: 1.1, trust: 0.8, safety: 0.5 },
  },
  {
    text: "如果 TA 被别人误解，我会愿意先了解情况再表态，而不是只看热闹。",
    theme: "stand by",
    weights: { loyalty: 0.9, trust: 0.7, investment: 0.5 },
  },
  {
    text: "我们很适合一起尝试新店、新展、热梗或新玩法。",
    theme: "trend buddy",
    weights: { trendFit: 1.1, companionship: 0.6, spark: 0.4 },
  },
  {
    text: "TA 发来的梗、歌、视频，我大多能接住其中的点。",
    theme: "meme resonance",
    weights: { trendFit: 1, resonance: 0.8, affection: 0.4 },
  },
  {
    text: "我们能一起做具体事情，比如搬家、赶项目、订行程，而且不太互相添堵。",
    theme: "practical team",
    weights: { practicality: 1.1, trust: 0.7, resonance: 0.5 },
  },
  {
    text: "谈到钱、借用东西或分工时，我们能把规则讲明白。",
    theme: "clear deal",
    weights: { practicality: 1, safety: 0.8, trust: 0.6 },
  },
  {
    text: "TA 变好时，我不会觉得自己被比下去，反而会有被带动的感觉。",
    theme: "growth without envy",
    weights: { growth: 1, autonomy: 0.7, affection: 0.5 },
  },
  {
    text: "我们会互相提醒对方别停在原地，但不会用打压的方式推动。",
    theme: "gentle push",
    weights: { growth: 1, trust: 0.7, safety: 0.6 },
  },
  {
    text: "我能分清“我想陪 TA”和“我必须负责 TA”的区别。",
    theme: "responsible distance",
    weights: { autonomy: 1.1, safety: 0.7, care: 0.4 },
  },
  {
    text: "即使关系很好，我们也能各自保留不想分享的部分。",
    theme: "privacy",
    weights: { autonomy: 1, safety: 0.8, trust: 0.5 },
  },
  {
    text: "和 TA 在一起，我不需要一直追热点或表现得很有趣。",
    theme: "unperformed bond",
    weights: { safety: 0.9, trust: 0.7, trendFit: -0.3 },
  },
  {
    text: "我们有点像固定搭子：吃饭、看展、打游戏或散步都能自然成行。",
    theme: "routine buddy",
    weights: { companionship: 0.9, trendFit: 0.7, affection: 0.5 },
  },
  {
    text: "TA 遇到选择时，我愿意认真帮 TA 盘利弊，而不是只给情绪反应。",
    theme: "practical care",
    weights: { practicality: 0.9, care: 0.7, trust: 0.5 },
  },
  {
    text: "我能听 TA 说家里、工作或生活里的琐碎难题，不觉得这些很麻烦。",
    theme: "daily burden",
    weights: { care: 0.9, companionship: 0.8, investment: 0.5 },
  },
  {
    text: "如果有人在我面前轻视 TA，我很难完全无动于衷。",
    theme: "protective reflex",
    weights: { loyalty: 0.9, affection: 0.6, exclusivity: 0.3 },
  },
  {
    text: "我们之间的玩笑能更新得很快，像有自己的流行语。",
    theme: "inside language",
    weights: { trendFit: 0.9, resonance: 0.8, companionship: 0.4 },
  },
  {
    text: "我们对彼此生活里的现实压力有基本理解。",
    theme: "pressure literacy",
    weights: { practicality: 0.8, care: 0.7, trust: 0.5 },
  },
  {
    text: "TA 需要空间时，我能忍住不把沉默理解成冷淡。",
    theme: "space tolerance",
    weights: { autonomy: 1, safety: 0.8, trust: 0.6, spark: -0.2 },
  },
  {
    text: "我觉得我们能一起度过很无聊的时间，不一定需要特别安排。",
    theme: "quiet time",
    weights: { companionship: 1, safety: 0.7, affection: 0.4 },
  },
  {
    text: "我们适合一起完成长期计划，而不是只适合临时起意。",
    theme: "long plan",
    weights: { growth: 0.8, practicality: 0.8, investment: 0.6 },
  },
  {
    text: "我会愿意为了 TA 维护一件很小但重要的承诺。",
    theme: "small promise",
    weights: { loyalty: 1, trust: 0.7, investment: 0.5 },
  },
  {
    text: "如果 TA 不赞同我，我更想听清楚原因，而不是立刻把它当背叛。",
    theme: "disagreement",
    weights: { trust: 0.9, autonomy: 0.7, safety: 0.5 },
  },
  {
    text: "我们能共享审美或生活方式，但不要求对方完全复制自己。",
    theme: "style without cloning",
    weights: { trendFit: 0.8, autonomy: 0.8, resonance: 0.5 },
  },
  {
    text: "我会注意 TA 是否累了、饿了、尴尬了，并调整相处方式。",
    theme: "small care",
    weights: { care: 0.9, resonance: 0.7, affection: 0.5 },
  },
  {
    text: "TA 可以在我面前不够体面，我也不会因此看低 TA。",
    theme: "dignity safety",
    weights: { safety: 1, care: 0.7, trust: 0.6 },
  },
  {
    text: "我们之间有点“老派”：话不一定多，但答应了就会做到。",
    theme: "old promise",
    weights: { loyalty: 1.1, trust: 0.8, practicality: 0.5 },
  },
  {
    text: "我不太喜欢把我们关系放在社交平台上证明给别人看。",
    theme: "offline bond",
    weights: { autonomy: 0.8, safety: 0.5, trendFit: -0.2 },
  },
  {
    text: "我们能一起吐槽时代变化、流行词、社交规则，但不会因此互相嫌弃。",
    theme: "era talk",
    weights: { trendFit: 0.8, resonance: 0.7, autonomy: 0.4 },
  },
  {
    text: "TA 认真向我求助时，我通常会把这件事放进自己的优先级。",
    theme: "priority help",
    weights: { investment: 0.8, care: 0.7, loyalty: 0.6 },
  },
  {
    text: "我能接受 TA 和我关系很好，同时也有别的很重要的人。",
    theme: "nonexclusive closeness",
    weights: { autonomy: 1, safety: 0.8, exclusivity: -0.5 },
  },
  {
    text: "我们会互相分享新东西：一首歌、一个 app、一种生活方式。",
    theme: "new feed",
    weights: { trendFit: 0.9, companionship: 0.5, growth: 0.5 },
  },
  {
    text: "我觉得 TA 让我看见了另一种生活可能。",
    theme: "new possibility",
    weights: { growth: 0.9, spark: 0.5, affection: 0.4 },
  },
  {
    text: "我们在价值观上不必完全一样，但底线大致相近。",
    theme: "shared bottom line",
    weights: { trust: 0.8, safety: 0.7, growth: 0.5 },
  },
  {
    text: "如果一起出门，我相信 TA 不会把麻烦全丢给我处理。",
    theme: "travel division",
    weights: { practicality: 0.9, trust: 0.8, safety: 0.5 },
  },
  {
    text: "我会愿意帮 TA 做一些不显眼但能减轻负担的小事。",
    theme: "invisible labor",
    weights: { care: 0.9, investment: 0.7, affection: 0.4 },
  },
  {
    text: "我们能把“谢谢”和“对不起”说出口，而不是靠关系好糊过去。",
    theme: "repair manners",
    weights: { trust: 0.8, safety: 0.7, practicality: 0.5 },
  },
  {
    text: "TA 不回消息时，我会不断刷新、猜测或想测试 TA 的反应。",
    theme: "message anxiety",
    weights: { spark: 0.7, exclusivity: 0.5, safety: -0.7, autonomy: -0.5 },
  },
  {
    text: "为了不破坏关系，我有时会隐藏真实不舒服。",
    theme: "swallow discomfort",
    weights: { safety: -0.9, trust: -0.6, autonomy: -0.4 },
  },
  {
    text: "我会希望 TA 站在我这边，即使我不一定完全有理。",
    theme: "blind side",
    weights: { loyalty: 0.7, exclusivity: 0.4, safety: -0.3 },
  },
  {
    text: "我们能够在外人面前互相给台阶，而不是拆台。",
    theme: "public dignity",
    weights: { loyalty: 0.9, safety: 0.7, trust: 0.5 },
  },
  {
    text: "如果要一起做决定，我们能讨论方案，而不是靠谁更强势。",
    theme: "decision process",
    weights: { practicality: 0.9, autonomy: 0.7, trust: 0.5 },
  },
  {
    text: "TA 的成功、变化或新关系不会让我觉得自己被夺走位置。",
    theme: "secure change",
    weights: { autonomy: 0.9, safety: 0.8, exclusivity: -0.4 },
  },
  {
    text: "我们适合一起经历长途旅行、赶 deadline 或处理突发状况。",
    theme: "stress test",
    weights: { practicality: 0.8, resonance: 0.7, trust: 0.7, companionship: 0.4 },
  },
  {
    text: "我和 TA 的关系里有一种很清楚的分寸，不用时时确认边界。",
    theme: "clean boundary",
    weights: { autonomy: 0.9, safety: 0.8, trust: 0.5 },
  },
  {
    text: "我们能聊旧事、家人、童年或很私人的记忆。",
    theme: "private history",
    weights: { care: 0.8, trust: 0.8, companionship: 0.5 },
  },
  {
    text: "我会尊重 TA 的家庭、文化或过去经历，不拿它们开轻率玩笑。",
    theme: "background respect",
    weights: { care: 0.8, safety: 0.8, trust: 0.4 },
  },
  {
    text: "我们之间有一些很土但很稳的仪式，比如固定问候、固定帮忙或固定见面。",
    theme: "steady ritual",
    weights: { loyalty: 0.8, companionship: 0.7, care: 0.5 },
  },
  {
    text: "TA 让我觉得自己可以慢慢变成熟，而不是必须立刻变完美。",
    theme: "slow maturity",
    weights: { growth: 0.9, safety: 0.7, affection: 0.4 },
  },
  {
    text: "我们有时很会一起疯，但收得回来，不会让对方难堪。",
    theme: "wild but safe",
    weights: { trendFit: 0.8, resonance: 0.7, safety: 0.6 },
  },
  {
    text: "如果关系需要冷静一下，我相信我们之后还能把话接上。",
    theme: "pause and return",
    weights: { trust: 0.9, safety: 0.8, autonomy: 0.5 },
  },
  {
    text: "我不希望 TA 只在需要帮助时才想起我。",
    theme: "one-way use",
    weights: { reciprocity: -1.1, trust: -0.5, safety: -0.4 },
  },
  {
    text: "我觉得这段关系不是靠一个人一直主动撑着。",
    theme: "mutual initiative",
    weights: { reciprocity: 1, safety: 0.6, investment: 0.5 },
  },
  {
    text: "我们都能主动发起见面或联系，而不是固定某一方追着跑。",
    theme: "balanced contact",
    weights: { reciprocity: 0.9, companionship: 0.6, resonance: 0.5 },
  },
  {
    text: "如果我帮了 TA，TA 不一定马上还，但我相信关系里会有来有回。",
    theme: "long-term reciprocity",
    weights: { reciprocity: 1, trust: 0.7, loyalty: 0.5 },
  },
  {
    text: "我们能对彼此的改变保持好奇，而不是只想把对方留在旧印象里。",
    theme: "curious growth",
    weights: { growth: 0.9, autonomy: 0.7, resonance: 0.5 },
  },
  {
    text: "我会为 TA 的长期选择着想，但不替 TA 做主人。",
    theme: "care with agency",
    weights: { care: 0.8, autonomy: 0.8, growth: 0.5 },
  },
  {
    text: "我们不是只靠聊天维持关系，也能在现实生活里互相承接。",
    theme: "offline support",
    weights: { practicality: 0.9, companionship: 0.7, trust: 0.5 },
  },
  {
    text: "如果把关系放到几年后想，我仍觉得它有继续存在的理由。",
    theme: "future reason",
    weights: { growth: 0.8, companionship: 0.7, loyalty: 0.5, affection: 0.4 },
  },
];

const OPTION_LABELS = [
  "完全不是",
  "不太像",
  "有一点像",
  "比较像",
  "非常像",
];

QUESTION_BANK.forEach((question, index) => {
  question.id = `q${String(index + 1).padStart(3, "0")}`;
});

const QUESTION_BY_ID = new Map(QUESTION_BANK.map((question) => [question.id, question]));
const DEFAULT_QUESTION_IDS = pickQuestionIds(makeQuestionSeed());
let QUESTIONS = questionsFromIds(DEFAULT_QUESTION_IDS);

function makeQuestionSeed() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function seededRandom(seed) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return () => {
    hash += 0x6d2b79f5;
    let value = hash;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, random) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function pickQuestionIds(seed) {
  const random = seededRandom(seed);
  const selected = [];
  const selectedIds = new Set();
  const addQuestion = (question) => {
    if (selectedIds.has(question.id) || selected.length >= QUESTIONS_PER_RUN) return false;
    selected.push(question);
    selectedIds.add(question.id);
    return true;
  };

  DIMENSIONS.forEach((dimension) => {
    const pool = shuffle(
      QUESTION_BANK.filter((question) => Math.abs(question.weights[dimension.key] || 0) >= 0.7),
      random,
    );
    let addedForDimension = 0;
    pool.forEach((question) => {
      if (addedForDimension < 2 && addQuestion(question)) addedForDimension += 1;
    });
  });

  shuffle(QUESTION_BANK, random).forEach(addQuestion);
  return selected.slice(0, QUESTIONS_PER_RUN).map((question) => question.id);
}

function questionsFromIds(ids) {
  return ids.map((id) => QUESTION_BY_ID.get(id)).filter(Boolean);
}

function normalizeQuestionIds(ids) {
  if (!Array.isArray(ids)) return pickQuestionIds(makeQuestionSeed());
  const uniqueIds = [...new Set(ids)].filter((id) => QUESTION_BY_ID.has(id));
  if (uniqueIds.length !== QUESTIONS_PER_RUN) return pickQuestionIds(makeQuestionSeed());
  return uniqueIds;
}

function setQuestionSet(ids) {
  state.questionIds = normalizeQuestionIds(ids);
  QUESTIONS = questionsFromIds(state.questionIds);
  state.current = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
}

function sampleAnswerFor(question, profile, index) {
  const signedWeight = Object.values(question.weights).reduce((sum, weight) => sum + weight, 0);
  const reverse = signedWeight < 0;
  const variant = (Number(question.id.slice(1)) + index) % 5;

  if (profile === "friend") {
    if (reverse) return variant <= 1 ? 2 : 3;
    return variant === 0 ? 4 : 5;
  }

  if (profile === "soft") {
    if (reverse) return variant <= 2 ? 2 : 3;
    return variant <= 1 ? 3 : 4;
  }

  if (reverse) return variant === 0 ? 3 : 2;
  return variant <= 1 ? 4 : 5;
}

function sampleAnswers(profile = "self", questions = QUESTIONS) {
  return questions.map((question, index) => sampleAnswerFor(question, profile, index));
}

const STORY_REFERENCES = {
  anneGilbert: {
    title: "安妮和吉尔伯特",
    work: "《绿山墙的安妮》",
    tag: "从熟悉到升温",
    description:
      "你们像从互相看见、互相较劲或互相欣赏里逐步靠近。重点不是马上定义关系，而是确认这份靠近能否被稳定回应。",
    motif: "gables",
    palette: ["#ffbd59", "#f06f6f", "#98a66b"],
  },
  elizabethDarcy: {
    title: "伊丽莎白和达西",
    work: "《傲慢与偏见》",
    tag: "高牵引，但误读成本也高",
    description:
      "你们的互动里有明显牵引，也容易出现误读。越在意，越需要清楚表达和稳定回应，否则关系会变成反复试探。",
    motif: "ballroom",
    palette: ["#f06f6f", "#ffbd59", "#5d83a8"],
  },
  joLaurie: {
    title: "乔和劳里",
    work: "《小妇人》",
    tag: "亲密很深，节奏未必一样",
    description:
      "你们像能共享很多信息和默契的人，但关系方向可能没有完全同步。适合先保护友情基础，再确认彼此期待的相处边界。",
    motif: "attic",
    palette: ["#98a66b", "#ffbd59", "#7d6b58"],
  },
  holmesWatson: {
    title: "福尔摩斯和华生",
    work: "《福尔摩斯探案集》",
    tag: "高默契协作型",
    description:
      "你们像一个负责敏锐判断，一个负责稳定承接。关系的核心不是甜度，而是信任、互补和一起解决问题的默契。",
    motif: "baker",
    palette: ["#ffbd59", "#98a66b", "#4d5c57"],
  },
  anneDiana: {
    title: "安妮和戴安娜",
    work: "《绿山墙的安妮》",
    tag: "安全感很高的知己",
    description:
      "你们像彼此的稳定区。关系里最重要的是自然、真诚和低压力陪伴，不需要把所有亲密都解释成升温。",
    motif: "orchard",
    palette: ["#98a66b", "#ffbd59", "#f6d3a7"],
  },
  moleRatty: {
    title: "鼹鼠和河鼠",
    work: "《柳林风声》",
    tag: "稳定舒服的陪伴型友情",
    description:
      "你们像能一起散步、吃饭、看风景的人。关系不一定轰烈，但有一种日常里的安定感，适合用共同经历慢慢加厚。",
    motif: "river",
    palette: ["#5d83a8", "#98a66b", "#ffbd59"],
  },
  aliceCat: {
    title: "爱丽丝和柴郡猫",
    work: "《爱丽丝漫游奇境》",
    tag: "有趣但还没完全落地",
    description:
      "你们像彼此生活里一个有趣的入口：会被吸引、会好奇，但关系还需要更多真实相处来判断能不能从新鲜感走向稳定。",
    motif: "wonderland",
    palette: ["#f06f6f", "#5d83a8", "#ffbd59"],
  },
  marchSisters: {
    title: "马奇姐妹",
    work: "《小妇人》",
    tag: "家人式照顾与共同成长",
    description:
      "你们的亲近更像一种互相看顾的生活联盟。它未必高调，却会在疲惫、低落或现实压力里自然出现。",
    motif: "orchard",
    palette: ["#98a66b", "#f6d3a7", "#ffbd59"],
  },
  peachGarden: {
    title: "刘备、关羽和张飞",
    work: "《三国演义》",
    tag: "老派义气型",
    description:
      "你们像重承诺、重站队、重关键时刻的人。关系的力量不在甜，而在答应过的事会被认真放在心上。",
    motif: "gables",
    palette: ["#ffbd59", "#7d6b58", "#f06f6f"],
  },
  tomHuck: {
    title: "汤姆和哈克",
    work: "《汤姆·索亚历险记》",
    tag: "潮流搭子与冒险感",
    description:
      "你们像能把日常玩出新鲜感的人。适合一起尝试、一起吐槽、一起更新生活，但也要确认热闹之外的稳定度。",
    motif: "river",
    palette: ["#5d83a8", "#ffbd59", "#98a66b"],
  },
  quixoteSancho: {
    title: "堂吉诃德和桑丘",
    work: "《堂吉诃德》",
    tag: "现实协作与互补",
    description:
      "你们像一个负责想象和方向，一个负责落地和提醒。真正的默契来自能一起处理现实，而不是永远意见一致。",
    motif: "baker",
    palette: ["#ffbd59", "#5d83a8", "#7d6b58"],
  },
};

const state = {
  current: 0,
  questionIds: [...DEFAULT_QUESTION_IDS],
  answers: Array(QUESTIONS.length).fill(null),
  inviteSeed: null,
  lastSubmission: null,
  lastReport: null,
};

const els = {
  loadSample: document.querySelector("#loadSample"),
  fillCurrentSample: document.querySelector("#fillCurrentSample"),
  resetAll: document.querySelector("#resetAll"),
  inviteStatus: document.querySelector("#inviteStatus"),
  selfName: document.querySelector("#selfName"),
  targetName: document.querySelector("#targetName"),
  progressText: document.querySelector("#progressText"),
  progressPercent: document.querySelector("#progressPercent"),
  progressBar: document.querySelector("#progressBar"),
  questionTheme: document.querySelector("#questionTheme"),
  questionText: document.querySelector("#questionText"),
  options: document.querySelector("#options"),
  prevQuestion: document.querySelector("#prevQuestion"),
  nextQuestion: document.querySelector("#nextQuestion"),
  result: document.querySelector("#result"),
  resultTitle: document.querySelector("#resultTitle"),
  resultSummary: document.querySelector("#resultSummary"),
  relationshipScore: document.querySelector("#relationshipScore"),
  relationshipType: document.querySelector("#relationshipType"),
  friendshipScore: document.querySelector("#friendshipScore"),
  loveSignalScore: document.querySelector("#loveSignalScore"),
  syncScore: document.querySelector("#syncScore"),
  dimensionBars: document.querySelector("#dimensionBars"),
  relationshipReading: document.querySelector("#relationshipReading"),
  loveReading: document.querySelector("#loveReading"),
  adviceText: document.querySelector("#adviceText"),
  shareTitle: document.querySelector("#shareTitle"),
  shareHint: document.querySelector("#shareHint"),
  shareLink: document.querySelector("#shareLink"),
  copyInvite: document.querySelector("#copyInvite"),
  simulateFriend: document.querySelector("#simulateFriend"),
  copyReport: document.querySelector("#copyReport"),
  storyArt: document.querySelector("#storyArt"),
  storySource: document.querySelector("#storySource"),
  storyTitle: document.querySelector("#storyTitle"),
  storyDescription: document.querySelector("#storyDescription"),
  storyImageNote: document.querySelector("#storyImageNote"),
  radar: document.querySelector("#radar"),
  toast: document.querySelector("#toast"),
};

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function cleanName(value, fallback) {
  const normalized = value.trim();
  return normalized ? normalized.slice(0, 12) : fallback;
}

function getNames() {
  return {
    self: cleanName(els.selfName.value, "我"),
    target: cleanName(els.targetName.value, "TA"),
  };
}

function encodePayload(payload) {
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodePayload(value) {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
    return JSON.parse(decodeURIComponent(escape(atob(padded))));
  } catch {
    return null;
  }
}

function makeSubmission(answers = state.answers) {
  const names = getNames();
  return {
    name: names.self,
    target: names.target,
    questionIds: [...state.questionIds],
    answers: [...answers],
    createdAt: new Date().toISOString(),
  };
}

function scoreAnswers(answers, questions = QUESTIONS) {
  const buckets = Object.fromEntries(
    DIMENSIONS.map((dimension) => [dimension.key, { sum: 0, weight: 0 }]),
  );

  questions.forEach((question, index) => {
    const answer = answers[index] || 3;
    const normalized = ((answer - 1) / 4) * 100;

    Object.entries(question.weights).forEach(([key, weight]) => {
      const directionValue = weight >= 0 ? normalized : 100 - normalized;
      buckets[key].sum += directionValue * Math.abs(weight);
      buckets[key].weight += Math.abs(weight);
    });
  });

  return Object.fromEntries(
    DIMENSIONS.map((dimension) => {
      const bucket = buckets[dimension.key];
      return [dimension.key, bucket.weight ? Math.round(clamp(bucket.sum / bucket.weight)) : 50];
    }),
  );
}

function friendshipBase(scores) {
  return Math.round(
    scores.affection * 0.1 +
      scores.resonance * 0.1 +
      scores.trust * 0.12 +
      scores.companionship * 0.09 +
      scores.safety * 0.12 +
      scores.investment * 0.09 +
      scores.care * 0.08 +
      scores.loyalty * 0.08 +
      scores.growth * 0.07 +
      scores.practicality * 0.06 +
      scores.autonomy * 0.05 +
      scores.reciprocity * 0.04,
  );
}

function loveSignal(scores) {
  return Math.round(
    scores.spark * 0.31 +
      scores.exclusivity * 0.2 +
      scores.investment * 0.13 +
      scores.affection * 0.1 +
      scores.trust * 0.08 +
      scores.resonance * 0.07 +
      scores.autonomy * 0.06 +
      scores.reciprocity * 0.05,
  );
}

function careSignal(scores) {
  return Math.round(
    scores.care * 0.34 +
      scores.safety * 0.2 +
      scores.companionship * 0.15 +
      scores.trust * 0.15 +
      scores.loyalty * 0.1 +
      scores.reciprocity * 0.06,
  );
}

function oldSchoolSignal(scores) {
  return Math.round(
    scores.loyalty * 0.32 +
      scores.trust * 0.2 +
      scores.practicality * 0.16 +
      scores.investment * 0.12 +
      scores.safety * 0.12 +
      scores.reciprocity * 0.08,
  );
}

function trendSignal(scores) {
  return Math.round(
    scores.trendFit * 0.38 +
      scores.resonance * 0.18 +
      scores.companionship * 0.14 +
      scores.spark * 0.12 +
      scores.autonomy * 0.1 +
      scores.affection * 0.08,
  );
}

function practicalSignal(scores) {
  return Math.round(
    scores.practicality * 0.34 +
      scores.trust * 0.2 +
      scores.safety * 0.14 +
      scores.investment * 0.12 +
      scores.growth * 0.1 +
      scores.reciprocity * 0.1,
  );
}

function growthSignal(scores) {
  return Math.round(
    scores.growth * 0.34 +
      scores.autonomy * 0.17 +
      scores.trust * 0.15 +
      scores.resonance * 0.12 +
      scores.safety * 0.12 +
      scores.investment * 0.1,
  );
}

function dominantFacet(scores) {
  const facets = [
    { label: "家人式照顾", value: careSignal(scores) },
    { label: "老派义气", value: oldSchoolSignal(scores) },
    { label: "潮流同频", value: trendSignal(scores) },
    { label: "现实协作", value: practicalSignal(scores) },
    { label: "共同成长", value: growthSignal(scores) },
    { label: "互惠稳定", value: Math.round(scores.reciprocity * 0.45 + scores.safety * 0.25 + scores.trust * 0.2 + scores.investment * 0.1) },
  ];
  return facets.sort((a, b) => b.value - a.value)[0];
}

function relationshipScore(scores, sync = null) {
  const base = friendshipBase(scores);
  const love = loveSignal(scores);
  const facet = dominantFacet(scores).value;
  if (typeof sync === "number") {
    return Math.round(base * 0.5 + facet * 0.22 + love * 0.13 + sync * 0.15);
  }
  return Math.round(base * 0.62 + facet * 0.23 + love * 0.15);
}

function averageScores(scoreA, scoreB) {
  return Object.fromEntries(
    DIMENSIONS.map((dimension) => [
      dimension.key,
      Math.round((scoreA[dimension.key] + scoreB[dimension.key]) / 2),
    ]),
  );
}

function syncScore(scoreA, scoreB) {
  const diffs = DIMENSIONS.map((dimension) => Math.abs(scoreA[dimension.key] - scoreB[dimension.key]));
  return Math.round(clamp(100 - average(diffs)));
}

function classify(scores, sync = null) {
  const base = friendshipBase(scores);
  const love = loveSignal(scores);
  const care = careSignal(scores);
  const oldSchool = oldSchoolSignal(scores);
  const trend = trendSignal(scores);
  const practical = practicalSignal(scores);
  const growth = growthSignal(scores);

  if (typeof sync === "number" && sync < 68) return "节奏差异型关系";
  if (love >= 78 && base >= 72 && scores.safety >= 62) return "高亲密升温型";
  if (love >= 72 && scores.exclusivity >= 75 && scores.safety < 58) return "高牵引高摩擦型";
  if (care >= 80 && love < 68) return "家人式照顾型";
  if (oldSchool >= 80 && scores.loyalty >= 78) return "老派义气型";
  if (trend >= 80 && base >= 60) return "潮流搭子型";
  if (practical >= 80 && base >= 62) return "现实协作型";
  if (growth >= 80 && scores.trust >= 65) return "共同成长型";
  if (love >= 60 && base >= 65) return "高亲密观察型";
  if (base >= 82 && scores.resonance >= 78) return "高默契搭档型";
  if (base >= 72 && scores.safety >= 75) return "高安全感好友";
  if (base >= 58) return "稳定陪伴型";
  return "轻量熟悉型";
}

function loveBand(love) {
  if (love >= 82) return "很高";
  if (love >= 68) return "明显";
  if (love >= 52) return "中等偏高";
  if (love >= 38) return "轻微";
  return "不明显";
}

function pickStoryReference(scores, sync, type) {
  const base = friendshipBase(scores);
  const love = loveSignal(scores);

  if (type === "节奏差异型关系") return STORY_REFERENCES.joLaurie;
  if (type === "高牵引高摩擦型") return STORY_REFERENCES.elizabethDarcy;
  if (type === "高亲密升温型") return STORY_REFERENCES.anneGilbert;
  if (type === "家人式照顾型") return STORY_REFERENCES.marchSisters;
  if (type === "老派义气型") return STORY_REFERENCES.peachGarden;
  if (type === "潮流搭子型") return STORY_REFERENCES.tomHuck;
  if (type === "现实协作型" || type === "共同成长型") return STORY_REFERENCES.quixoteSancho;
  if (type === "高亲密观察型") {
    return typeof sync === "number" && sync < 78 ? STORY_REFERENCES.joLaurie : STORY_REFERENCES.anneGilbert;
  }
  if (type === "高默契搭档型") return STORY_REFERENCES.holmesWatson;
  if (type === "高安全感好友") return STORY_REFERENCES.anneDiana;
  if (type === "稳定陪伴型") return STORY_REFERENCES.moleRatty;
  if (base >= 76 && love < 45) return STORY_REFERENCES.anneDiana;
  return STORY_REFERENCES.aliceCat;
}

function buildCopy({ scores, sync, type, pairMode }) {
  const base = friendshipBase(scores);
  const love = loveSignal(scores);
  const isUnsynced = typeof sync === "number" && sync < 68;
  const highLoveLowSafety = love >= 68 && scores.safety < 58;
  const facet = dominantFacet(scores);
  const typeReadings = {
    家人式照顾型:
      "你们的亲近很像家人式照顾：会留意彼此的状态、疲惫和现实压力，也比较愿意承接生活里的琐碎部分。",
    老派义气型:
      "你们的关系带有很强的老派义气：话不一定密，但关键时刻、承诺和站出来的动作会显得很重要。",
    潮流搭子型:
      "你们很像潮流搭子：能接住彼此的新鲜事、梗、审美和活动提议，关系里有轻快的同步感。",
    现实协作型:
      "你们的关系强在现实协作：分工、计划、突发状况和具体问题处理得比较顺，不只是聊天舒服。",
    共同成长型:
      "你们会互相带出新的可能性。关系的重点不是黏在一起，而是看见对方变化，并允许彼此继续变大。",
  };

  let relationshipReading = "这段关系的友情基础还在形成中，更多像是舒服的熟悉感。适合继续观察真实相处，而不是急着给关系命名。";
  if (base >= 82) {
    relationshipReading = "你们的友情基础非常厚：好感、信任、默契和陪伴感都比较集中。即使不频繁解释，也容易回到同一个频道。";
  } else if (base >= 70) {
    relationshipReading = "你们已经不只是普通熟人。关系里有稳定陪伴和真实表达，适合继续通过具体相处积累确定感。";
  } else if (base >= 58) {
    relationshipReading = "你们有不错的相处基础，但还需要更多共同经历来加深信任和默契。现在更像一个可以继续升温的关系。";
  }

  if (typeReadings[type]) {
    relationshipReading = typeReadings[type];
  }

  let loveReading = "目前升温信号不明显，更像稳定、清晰的友情亲近。报告不建议把高好感直接解释成关系变化。";
  if (love >= 82) {
    loveReading = "关系里出现了很高的升温信号：情绪牵引、优先级和边界敏感度都高于普通熟人关系。不过这仍然只是互动信号，不等于替你们做结论。";
  } else if (love >= 68) {
    loveReading = "升温信号比较明显。你们之间不只有舒服的友情，也有更在意回应、更期待单独相处的互动倾向。";
  } else if (love >= 52) {
    loveReading = "这段关系有一定升温空间。它可能是高亲密友情，也可能只是阶段性的强依赖，需要看双方是否都愿意继续增加投入。";
  } else if (love >= 38) {
    loveReading = "有轻微信号，但不足以判断关系方向发生变化。更像关系里出现了一点额外关注或优先级变化。";
  }

  let advice = "继续把重点放在舒服、稳定和可回应的相处上。多制造共同经历，比直接追问定义更能看清关系。";
  if (isUnsynced) {
    advice = "你们的关系节奏不完全一致。不要用分数逼问对方，也不要一次性把关系推到必须表态的位置。更适合用低压力的单独相处确认双方边界。";
  } else if (highLoveLowSafety) {
    advice = "牵引感高但安全感不足时，关系容易反复。先减少猜测和试探，建立稳定回应，再讨论要不要增加投入。";
  } else if (type === "家人式照顾型") {
    advice = "照顾感强时，最需要保留边界。别让关系变成单方面负责，也别把被照顾当作理所当然。";
  } else if (type === "老派义气型") {
    advice = "承诺和站队是这类关系的核心。建议把真实需求说清楚，别只靠“你懂的”来维持默契。";
  } else if (type === "潮流搭子型") {
    advice = "这类关系适合一起更新生活，但也要偶尔脱离热闹场景，看看无聊、低能量时是否依然舒服。";
  } else if (type === "现实协作型") {
    advice = "你们适合把关系放进现实里检验。继续保持清楚分工、及时感谢和边界说明，会比含糊客套更稳。";
  } else if (type === "共同成长型") {
    advice = "共同成长不是互相改造。保留好奇、鼓励和自主空间，这段关系会更容易从阶段性陪伴变成长期连接。";
  } else if (love >= 68 && base >= 70) {
    advice = "友情基础已经能承接更多投入。可以增加真实表达和单独相处，但保持节奏，不要把关系突然推到必须回答的位置。";
  } else if (base >= 82 && love < 52) {
    advice = "这是高质量友情，不需要为了结果好看而强行解释成关系升温。珍惜这种自然、稳定、低压力的亲密。";
  }

  if (pairMode && !isUnsynced) {
    relationshipReading += " 双人结果显示你们的感受节奏相对接近，所以报告更适合看作共同画像，而不是单方面猜测。";
  }

  return {
    summary: `友情基础 ${base}%，升温信号 ${loveBand(love)}，突出气质是${facet.label}。${type}不是诊断标签，而是一张关系地图。`,
    relationshipReading,
    loveReading,
    advice,
  };
}

function renderQuestion() {
  const question = QUESTIONS[state.current];
  const total = QUESTIONS.length;
  const percent = Math.round(((state.current + 1) / total) * 100);
  const target = cleanName(els.targetName.value, "TA");

  els.progressText.textContent = `第 ${state.current + 1} / ${total} 题`;
  els.progressPercent.textContent = `${percent}%`;
  els.progressBar.style.width = `${percent}%`;
  els.questionTheme.textContent = question.theme;
  els.questionText.textContent = question.text.replaceAll("TA", target);
  els.prevQuestion.disabled = state.current === 0;
  els.nextQuestion.textContent = state.current === total - 1 ? "生成报告" : "下一题";

  els.options.innerHTML = "";
  OPTION_LABELS.forEach((label, index) => {
    const value = index + 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `option${state.answers[state.current] === value ? " is-selected" : ""}`;
    button.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    button.addEventListener("click", () => {
      state.answers[state.current] = value;
      renderQuestion();
    });
    els.options.appendChild(button);
  });
}

function renderBars(scores) {
  els.dimensionBars.innerHTML = "";

  DIMENSIONS.forEach((dimension) => {
    const value = scores[dimension.key];
    const item = document.createElement("div");
    item.className = "bar";
    item.innerHTML = `
      <div class="bar__label">
        <strong>${dimension.label}</strong>
        <span>${value}%</span>
      </div>
      <div class="bar__track"><i></i></div>
    `;
    els.dimensionBars.appendChild(item);
    requestAnimationFrame(() => {
      item.querySelector("i").style.width = `${value}%`;
    });
  });
}

function renderRadar(scores) {
  const center = 130;
  const maxRadius = 88;
  const labelRadius = 116;
  const angleStep = (Math.PI * 2) / DIMENSIONS.length;
  const makePoint = (radius, index) => {
    const angle = -Math.PI / 2 + angleStep * index;
    return [center + Math.cos(angle) * radius, center + Math.sin(angle) * radius];
  };
  const svg = els.radar;
  svg.innerHTML = "";

  [0.25, 0.5, 0.75, 1].forEach((scale) => {
    const points = DIMENSIONS.map((_, index) => makePoint(maxRadius * scale, index).join(",")).join(" ");
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", points);
    polygon.setAttribute("fill", "none");
    polygon.setAttribute("stroke", "rgba(251, 240, 209, 0.14)");
    polygon.setAttribute("stroke-width", "1");
    svg.appendChild(polygon);
  });

  DIMENSIONS.forEach((dimension, index) => {
    const [x, y] = makePoint(maxRadius, index);
    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", center);
    axis.setAttribute("y1", center);
    axis.setAttribute("x2", x);
    axis.setAttribute("y2", y);
    axis.setAttribute("stroke", "rgba(251, 240, 209, 0.16)");
    svg.appendChild(axis);

    const [labelX, labelY] = makePoint(labelRadius, index);
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", labelX);
    label.setAttribute("y", labelY);
    label.setAttribute("fill", "#b9a889");
    label.setAttribute("font-size", "11");
    label.setAttribute("text-anchor", labelX < center - 4 ? "end" : labelX > center + 4 ? "start" : "middle");
    label.setAttribute("dominant-baseline", "middle");
    label.textContent = dimension.label;
    svg.appendChild(label);
  });

  const points = DIMENSIONS.map((dimension, index) => {
    const radius = (scores[dimension.key] / 100) * maxRadius;
    return makePoint(radius, index).join(",");
  }).join(" ");

  const area = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  area.setAttribute("points", points);
  area.setAttribute("fill", "rgba(255, 189, 89, 0.24)");
  area.setAttribute("stroke", "#ffbd59");
  area.setAttribute("stroke-width", "2");
  svg.appendChild(area);
}

function storyMotifPath(motif) {
  const motifs = {
    gables: '<path d="M118 251 L183 194 L249 251" fill="none" stroke="rgba(251,240,209,.35)" stroke-width="5" stroke-linecap="round"/><path d="M130 252 H238" stroke="rgba(251,240,209,.22)" stroke-width="3"/>',
    ballroom: '<path d="M118 218 C160 168 207 168 250 218" fill="none" stroke="rgba(251,240,209,.32)" stroke-width="4"/><path d="M101 238 C151 257 216 257 270 238" fill="none" stroke="rgba(251,240,209,.2)" stroke-width="3"/>',
    attic: '<path d="M102 104 H280 L250 151 H132 Z" fill="rgba(251,240,209,.08)" stroke="rgba(251,240,209,.22)" stroke-width="2"/><path d="M121 128 H258" stroke="rgba(251,240,209,.16)" stroke-width="2"/>',
    baker: '<path d="M126 92 H252 V172 H126 Z" fill="rgba(251,240,209,.07)" stroke="rgba(251,240,209,.2)" stroke-width="2"/><path d="M142 112 H236 M142 137 H236 M142 162 H236" stroke="rgba(251,240,209,.16)" stroke-width="2"/>',
    orchard: '<path d="M96 222 C138 174 184 174 226 222" fill="none" stroke="rgba(251,240,209,.25)" stroke-width="4"/><circle cx="118" cy="194" r="7" fill="rgba(255,189,89,.42)"/><circle cx="210" cy="190" r="6" fill="rgba(240,111,111,.35)"/>',
    river: '<path d="M70 238 C126 211 172 268 230 234 C274 209 313 220 352 239" fill="none" stroke="rgba(93,131,168,.55)" stroke-width="8" stroke-linecap="round"/>',
    wonderland: '<path d="M129 104 C158 75 219 77 247 104" fill="none" stroke="rgba(251,240,209,.24)" stroke-width="3"/><path d="M118 246 C178 210 228 278 293 232" fill="none" stroke="rgba(251,240,209,.22)" stroke-width="4" stroke-linecap="round"/>',
  };

  return motifs[motif] || motifs.wonderland;
}

function makeStorySvg(reference) {
  const [primary, secondary, tertiary] = reference.palette;
  return `
    <svg viewBox="0 0 560 360" role="img" aria-label="${reference.title}关系插画">
      <defs>
        <radialGradient id="storyGlow" cx="48%" cy="42%" r="60%">
          <stop offset="0%" stop-color="${primary}" stop-opacity=".34"/>
          <stop offset="58%" stop-color="${secondary}" stop-opacity=".13"/>
          <stop offset="100%" stop-color="#100f0c" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="storyLine" x1="92" y1="0" x2="466" y2="340">
          <stop offset="0%" stop-color="${primary}"/>
          <stop offset="54%" stop-color="${secondary}"/>
          <stop offset="100%" stop-color="${tertiary}"/>
        </linearGradient>
      </defs>
      <rect width="560" height="360" rx="34" fill="#14110c"/>
      <rect width="560" height="360" rx="34" fill="url(#storyGlow)"/>
      <path d="M42 73 C146 42 210 115 281 85 C381 43 438 91 517 62" fill="none" stroke="rgba(251,240,209,.11)" stroke-width="2"/>
      <path class="story-arc" d="M143 205 C199 139 279 139 337 205" fill="none" stroke="url(#storyLine)" stroke-width="7" stroke-linecap="round"/>
      ${storyMotifPath(reference.motif)}
      <g class="story-person story-person--left">
        <circle cx="196" cy="146" r="34" fill="${primary}"/>
        <path d="M136 280 C143 211 160 177 197 177 C235 177 253 211 260 280 Z" fill="rgba(251,240,209,.88)"/>
        <path d="M169 145 C174 113 214 108 228 136 C219 154 192 160 169 145 Z" fill="rgba(16,15,12,.64)"/>
      </g>
      <g class="story-person story-person--right">
        <circle cx="357" cy="146" r="34" fill="${secondary}"/>
        <path d="M299 280 C306 211 322 177 358 177 C398 177 415 211 423 280 Z" fill="rgba(251,240,209,.78)"/>
        <path d="M333 134 C348 109 390 121 391 153 C372 162 348 157 333 134 Z" fill="rgba(16,15,12,.62)"/>
      </g>
      <circle cx="279" cy="178" r="7" fill="${tertiary}"/>
      <circle cx="279" cy="178" r="23" fill="none" stroke="${tertiary}" stroke-opacity=".38" stroke-width="2"/>
    </svg>
  `;
}

function renderStoryReference(reference) {
  els.storySource.textContent = `${reference.work} · ${reference.tag}`;
  els.storyTitle.textContent = reference.title;
  els.storyDescription.textContent = reference.description;
  els.storyImageNote.textContent = "插画为本站生成的原创剪影，用来表达关系气质，不是官方剧照或角色图片。";
  els.storyArt.innerHTML = makeStorySvg(reference);
}

function makeInviteLink(submission) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("match", encodePayload(submission));
  return url.toString();
}

function renderReport(report) {
  state.lastReport = report;
  const { scores, pairMode, selfName, targetName, sync, type, score, copy } = report;
  const storyReference = pickStoryReference(scores, sync, type);
  report.storyReference = storyReference;

  els.result.hidden = false;
  els.resultTitle.textContent = pairMode ? `${selfName} 和 ${targetName} 的双人关系报告` : `${selfName} 和 ${targetName} 的关系报告`;
  els.resultSummary.textContent = copy.summary;
  els.relationshipScore.textContent = score;
  els.relationshipType.textContent = type;
  els.friendshipScore.textContent = `${friendshipBase(scores)}%`;
  els.loveSignalScore.textContent = `${loveSignal(scores)}%`;
  els.syncScore.textContent = typeof sync === "number" ? `${sync}%` : "单人模式";
  els.relationshipReading.textContent = copy.relationshipReading;
  els.loveReading.textContent = copy.loveReading;
  els.adviceText.textContent = copy.advice;

  renderRadar(scores);
  renderBars(scores);
  renderStoryReference(storyReference);

  if (pairMode) {
    els.shareTitle.textContent = "双人报告已生成";
    els.shareHint.textContent = "可以复制一段适合分享的结果文案，隐私答案不会被公开。";
    els.shareLink.value = buildReportText(report);
    els.copyInvite.textContent = "复制报告文案";
    els.simulateFriend.hidden = true;
  } else {
    els.shareTitle.textContent = "邀请 TA 完成同一套题";
    els.shareHint.textContent = "TA 答完后，会生成双人匹配报告。链接里包含本次 40 题题组和你的答案，正式产品应改为后端存储。";
    els.shareLink.value = makeInviteLink(state.lastSubmission);
    els.copyInvite.textContent = "复制邀请链接";
    els.simulateFriend.hidden = false;
  }

  els.result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSolo(submission) {
  state.lastSubmission = submission;
  const questions = questionsFromIds(submission.questionIds || state.questionIds);
  const scores = scoreAnswers(submission.answers, questions.length === submission.answers.length ? questions : QUESTIONS);
  const type = classify(scores);
  const score = relationshipScore(scores);
  const copy = buildCopy({ scores, sync: null, type, pairMode: false });
  renderReport({
    pairMode: false,
    selfName: submission.name,
    targetName: submission.target,
    scores,
    sync: null,
    type,
    score,
    copy,
  });
}

function renderPair(seedSubmission, responseSubmission) {
  const questions = questionsFromIds(seedSubmission.questionIds || state.questionIds);
  const pairQuestions = questions.length === seedSubmission.answers.length ? questions : QUESTIONS;
  const seedScores = scoreAnswers(seedSubmission.answers, pairQuestions);
  const responseScores = scoreAnswers(responseSubmission.answers, pairQuestions);
  const scores = averageScores(seedScores, responseScores);
  const sync = syncScore(seedScores, responseScores);
  const type = classify(scores, sync);
  const score = relationshipScore(scores, sync);
  const copy = buildCopy({ scores, sync, type, pairMode: true });

  state.lastSubmission = responseSubmission;
  renderReport({
    pairMode: true,
    selfName: seedSubmission.name,
    targetName: responseSubmission.name,
    scores,
    sync,
    type,
    score,
    copy,
  });
}

function buildReportText(report) {
  const love = loveSignal(report.scores);
  const sync = typeof report.sync === "number" ? `，节奏同步 ${report.sync}%` : "";
  const story = report.storyReference ? `关系参照：${report.storyReference.title}（${report.storyReference.work}）。` : "";
  return `我和 ${report.targetName} 的关系浓度是 ${report.score}%：${report.type}。友情基础 ${friendshipBase(report.scores)}%，升温信号 ${loveBand(love)}${sync}。${story}${report.copy.advice}`;
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch {
    els.shareLink.focus();
    els.shareLink.select();
    document.execCommand("copy");
    showToast(successMessage);
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

function finishQuestionnaire() {
  const missingIndex = state.answers.findIndex((answer) => answer === null);
  if (missingIndex !== -1) {
    state.current = missingIndex;
    renderQuestion();
    showToast(`还有第 ${missingIndex + 1} 题没有作答`);
    return;
  }

  const submission = makeSubmission();
  if (state.inviteSeed) {
    renderPair(state.inviteSeed, submission);
  } else {
    renderSolo(submission);
  }
}

function resetAnswers() {
  state.current = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  state.lastSubmission = null;
  state.lastReport = null;
  els.result.hidden = true;
  renderQuestion();
  showToast("已清空当前答案");
}

function simulateFriend() {
  if (!state.lastSubmission) {
    state.answers = sampleAnswers("self");
    state.current = QUESTIONS.length - 1;
    const names = getNames();
    els.selfName.value = names.self;
    els.targetName.value = names.target;
    renderSolo(makeSubmission());
  }

  const friendName = cleanName(els.targetName.value, "TA");
  const friendSubmission = {
    name: friendName,
    target: state.lastSubmission.name,
    questionIds: [...state.questionIds],
    answers: sampleAnswers("soft"),
    createdAt: new Date().toISOString(),
  };
  renderPair(state.lastSubmission, friendSubmission);
}

function loadPairSample() {
  setQuestionSet(pickQuestionIds("cece-sample-pair"));
  renderQuestion();
  const seed = {
    name: "林也",
    target: "小满",
    questionIds: [...state.questionIds],
    answers: sampleAnswers("self"),
    createdAt: new Date().toISOString(),
  };
  const response = {
    name: "小满",
    target: "林也",
    questionIds: [...state.questionIds],
    answers: sampleAnswers("friend"),
    createdAt: new Date().toISOString(),
  };
  renderPair(seed, response);
}

function initializeFromInvite() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("match");
  if (!encoded) return;

  const payload = decodePayload(encoded);
  const rawQuestionIds = payload?.questionIds;
  const hasValidQuestionIds =
    Array.isArray(rawQuestionIds) &&
    rawQuestionIds.length === QUESTIONS_PER_RUN &&
    new Set(rawQuestionIds).size === QUESTIONS_PER_RUN &&
    rawQuestionIds.every((id) => QUESTION_BY_ID.has(id));
  const isValid =
    payload &&
    hasValidQuestionIds &&
    Array.isArray(payload.answers) &&
    payload.answers.length === QUESTIONS_PER_RUN &&
    payload.answers.every((value) => Number.isInteger(value) && value >= 1 && value <= 5);

  if (!isValid) {
    showToast("邀请链接无效，已进入单人模式");
    return;
  }

  setQuestionSet(rawQuestionIds);
  state.inviteSeed = payload;
  els.selfName.value = payload.target && payload.target !== "TA" ? payload.target : "我";
  els.targetName.value = payload.name || "TA";
  els.inviteStatus.textContent = `正在回应 ${payload.name || "TA"} 的邀请`;
}

els.prevQuestion.addEventListener("click", () => {
  state.current = Math.max(0, state.current - 1);
  renderQuestion();
});

els.nextQuestion.addEventListener("click", () => {
  if (state.answers[state.current] === null) {
    showToast("请先选择这一题的答案");
    return;
  }

  if (state.current < QUESTIONS.length - 1) {
    state.current += 1;
    renderQuestion();
  } else {
    finishQuestionnaire();
  }
});

els.targetName.addEventListener("input", renderQuestion);
els.fillCurrentSample.addEventListener("click", () => {
  state.answers = sampleAnswers("self");
  state.current = QUESTIONS.length - 1;
  renderQuestion();
  finishQuestionnaire();
});
els.resetAll.addEventListener("click", resetAnswers);
els.loadSample.addEventListener("click", loadPairSample);
els.simulateFriend.addEventListener("click", simulateFriend);
els.copyInvite.addEventListener("click", () => {
  if (!state.lastReport) return showToast("请先生成报告");
  return copyText(els.shareLink.value, state.lastReport.pairMode ? "双人报告文案已复制" : "邀请链接已复制");
});
els.copyReport.addEventListener("click", () => {
  if (!state.lastReport) return showToast("请先生成报告");
  return copyText(buildReportText(state.lastReport), "报告文案已复制");
});

initializeFromInvite();
renderQuestion();
