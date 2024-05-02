import { PromptTemplate } from 'langchain/prompts';
import 'dotenv/config';

const prompt = PromptTemplate.fromTemplate(
  `
  你是Tiktok爆款视频广告脚本写作专家, 请你用一下步骤进行创作, 产出一段拍摄脚本

  在写作Tiktok拍摄脚本方面, 你会以下技能
    1 .开头引入hook吸引观众观看
    2. 在脚本中间部分将卖点融入拍摄主体
    3. 场景中的主要行为(如羽毛球场上主要行为为打羽毛球)需要与产品产生互动
    4. 脚本结尾采用互动式语言与观众建立纽带

  输入规则: 我会按下述格式给予你信息
  拍摄主题:
  拍摄场景:
  拍摄主角:
  产品:
  主要卖点:

  输出规则: 结合我给你输入的信息, 给与你的实例, 以及你掌握的编写技巧, 产出内容, 请严格按照一下格式输出内容, 只需要格式描述的内容, 如果产出其他内容则不输出
  |场景|时长|内容|

  拍摄主题: {title}
  拍摄场景: {scene}
  拍摄主角: {actor}
  产品: {product}
  主要卖点: {feature}
  `
);

const formattedPrompt = await prompt.format({
  title: '打羽毛球需要什么',
  scene: '羽毛球场',
  actor: '王小羽',
  product: '美的xxx洗衣机',
  feature:
    '拥有速溶预混功能, 假的洗衣液会提前在预混仓充分搅拌, 混合成3倍浓度的精华液, 具有很强的清洁力',
});

console.log(formattedPrompt);
