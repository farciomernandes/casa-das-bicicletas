import * as cheerio from 'cheerio';

export interface HtmlToJsonParser {
  parseHtmlToJSON(html: string): Record<string, any>;
}

export class HtmlToJsonParserImpl implements HtmlToJsonParser {
  parseHtmlToJSON(html: string): Record<string, any> {
    const $ = cheerio.load(html);
    const jsonResult: Record<string, any> = {};

    $('meta').each((i, el) => {
      const name = $(el).attr('name') || $(el).attr('property');
      const content = $(el).attr('content');
      if (name && content) {
        jsonResult[name] = content;
      }
    });

    const title = $('title').text();
    if (title) {
      jsonResult.title = title;
    }

    return jsonResult;
  }
}
