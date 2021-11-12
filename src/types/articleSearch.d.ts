type HeadlineKey =
  | 'main'
  | 'kicker'
  | 'content_kicker'
  | 'print_headline'
  | 'name'
  | 'seo'
  | 'sub';

type PersonKey =
  | 'firstname'
  | 'middlename'
  | 'lastname'
  | 'qualifier'
  | 'title'
  | 'role'
  | 'organization'
  | 'rank';

type MetaKey = 'hits' | 'offset' | 'time';

interface Legacy {
  xlarge: string;
  xlargewidth: integer;
  xlargeheight: integer;
}

interface Multimedia {
  rank: integer;
  subtype: string;
  caption: string;
  credit: string;
  type: string;
  url: string;
  height: integer;
  width: integer;
  legacy: Legacy;
  crop_name: string;
}

interface Keywords {
  name: string;
  value: string;
  rank: integer;
  major: string;
}

interface Byline {
  original: string;
  person: { [key in PersonKey]: string | integer }[];
  organization: string;
}

interface Article {
  abstract: string;
  byline: Byline;
  document_type: string;
  headline: Record<HeadlineKey, string>;
  keywords: Keywords[];
  lead_paragraph: string;
  multimedia: Multimedia[];
  news_desk: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  source: string;
  subsection_name: string;
  type_of_material: string;
  uri: string;
  web_url: string;
  word_count: integer;
  _id: string;
}

interface Response {
  docs: Article[];
  meta: Record<MetaKey, integer>;
}

interface ArticleSearch {
  status: string;
  copyright: string;
  response: Response;
}
