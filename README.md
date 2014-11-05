hexo-console-rename [![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]
===================

> [Hexo] console plug-in to rename post file according to its title, if asset folder is also renamed if exsits

## Install

Install using [npm][npm-url].

    $ npm install hexo-console-rename --save

## Background

To know more about this plug-in, check out this [post].

## Usage

### Rename specific file

```
  $ hexo rename source/_post/some_post_with_wrong_file_name.md

  [find] source/_post/some_post_with_wrong_file_name.md
  [rename] source/_post/some_post_with_wrong_file_name.md -> source/_post/new_file_name_from_title.md
  [rename] source/_post/some_post_with_wrong_file_name -> source/_post/new_file_name_from_title
```
### Rename with glob

**IMPORTANT TIP** Commit all your files into git before excute this command
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

### Update published posts

When no arg is passed, it is equals to `hexo rename source/_posts/*.*`

```
  $ hexo rename
  [find] source/_posts/2014-03-02-new_post.md
  [find] source/_posts/2014-08-18-name.md
  [rename] source/_posts/2014-08-18-name.md -> source/_posts/2014-08-18-name-is-something-really-cool.md
  [rename] source/_posts/2014-08-18-name -> source/_posts/2014-08-18-name-is-something-really-cool
```

## Advanced Usage

`hexo-console-rename` can be used not only sync file name with `title`, it does more.

### Synchronize TimeStamp in Filename

If you have `timestamp` in your file name, then if you updated the `date` field in your front-matter. You'll probably wish to update the file name also.

`hexo-console-rename` can help you on this.

**IMPORTANT TIP** Commit all your files into git before excute this command
```
  $ hexo r source/**/*.md

  [find] source/_posts/2014-08-18-name.md
  [find] source/_posts/codepen.md
  [find] source/_posts/image.md
  [find] source/_posts/cool_post.md
  [find] source/_posts/new_post.md
  [rename] source/_posts/2014-08-18-name.md -> source/_posts/2014-08-19-name.md
  [rename] source/_posts/2014-08-18-name -> source/_posts/2014-08-19-name
```

### Migrate Post File Name

Suppose you update the `new_post_name` field in your `_config.yml`, then you might wish to migrate all post to fit the new name pattern.

`hexo-console-rename` can help you on this. You need to specify the old pattern with `--old-permalink` (`-p` for short), then all post will be migrated automatically.

Suppose you changed `new_post_name` from `:title.md` to `:year-:month-:day-:title.md`.

**IMPORTANT TIP** Commit all your files into git before excute this command
```
  $ hexo r -p ':title.md' source/**/*.md

  [find] source/_posts/2014-08-17-codepen.md
  [find] source/_posts/2014-08-18-name-is-something-really-cool.md
  [find] source/_posts/2014-08-19-name-is-cool.md
  [find] source/_posts/image.md
  [find] source/_posts/post.md
  [find] source/_posts/cool-post.md
  [rename] source/_posts/image.md -> source/_posts/2014-08-15-image.md
  [rename] source/_posts/cool-post.md -> source/_posts/2014-08-15-post.md
  [rename] source/_posts/.md -> source/_posts/2014-08-15-cool-post.md
  [rename] source/_posts/image -> source/_posts/2014-08-15-image
  [rename] source/_posts/post -> source/_posts/2014-08-15-post
  [rename] source/_posts/cool-post -> source/_posts/2014-08-15-cool-post
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
[post]: http://timnew.dev/blog/2014/08/19/Hexo-plug-in-to-rename-the-post-according-to-title-automatically/
