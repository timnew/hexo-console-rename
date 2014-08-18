hexo-console-rename [![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]
===================

> [Hexo] console plug-in to rename post file according to its title, if asset folder is also renamed if exsits

## Install

Install using [npm][npm-url].

    $ npm install hexo-console-rename --save

## Usage

### Rename specific file

```
  $ hexo rename source/_post/some_post_with_wrong_file_name.md

  [find] source/_post/some_post_with_wrong_file_name.md
  [rename] source/_post/some_post_with_wrong_file_name.md -> source/_post/new_file_name_from_title.md
  [rename] source/_post/some_post_with_wrong_file_name -> source/_post/new_file_name_from_title
```
### Rename with glob

```
  $ hexo r source/**/*.md
  [find] source/_drafts/name.md
  [find] source/_posts/2014-08-18-name.md
  [find] source/_posts/codepen.md
  [find] source/_posts/image.md
  [find] source/_posts/cool_post.md
  [find] source/_posts/new_post.md
  [rename] source/_drafts/name.md -> source/_drafts/name-is-cool.md
  [rename] source/_posts/2014-08-18-name.md -> source/_posts/2014-08-18-name-is-something-really-cool.md
  [rename] source/_drafts/name -> source/_drafts/name-is-cool
  [rename] source/_posts/2014-08-18-name -> source/_posts/2014-08-18-name-is-something-really-cool
```

## License
MIT

[![NPM downloads][npm-downloads]][npm-url]

[homepage]: https://github.com/timnew/hexo-console-rename

[npm-url]: https://npmjs.org/package/hexo-console-rename
[npm-image]: http://img.shields.io/npm/v/hexo-console-rename.svg?style=flat
[npm-downloads]: http://img.shields.io/npm/dm/hexo-console-rename.svg?style=flat

[depstat-url]: https://gemnasium.com/timnew/hexo-console-rename
[depstat-image]: http://img.shields.io/gemnasium/timnew/hexo-console-rename.svg?style=flat

[Hexo]: http://hexo.io/
