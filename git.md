## git

#### git branch

查看的是当前所在的本地库所有的分支

#### git branch -a 

查看到的是当前所在的本地库的分支 以及 所关联的远程库的分支

#### git status

能查看本地库有几个分支，文件的具体情况，是否上传到了本地库，not connit/untracked之类

#### git remote -v

查看所关联的远程库



## 本地文件推送至github

#### 新建一个本地库

```git
git init
```

此时就会成功的新建一个本地库，其中的文件都no commit untracked

#### 将文件夹推送至本地库

```git
git add . 
```

此时再 git status 出来的结果是 not commit yet / tracked，然后就可以commit了

```git
git commit -m "对本次提交添加的注释"
```

#### 新建一个本地分支

```git
$ git checkout -b notes
Switched to a new branch 'notes'
```

此时 git branch 结果是 master 和 notes

#### 关联本地库以及远程库

```git
git remote add CATassessment https://github.com/haber625/CATassessment.git
```



#### 将本地库文件推送至远程库

```git
$ git push CATassessment notes:notes
```

成功的新建了一个叫notes的远程库分支，并且将本地分支的文件提交至远程库的一个分支里

## 将更改的代码再次提交至远程仓库

```git
git add .
//将代码添加至暂存区

git commit -m '备注'
//将代码提交至本地库

$ git checkout -t CAtassessment/master
//切换至远程分支

$  git push CATassessment wangyi:master
//git push <远程主机名> <本地分支名>:<远程分支名>

$ git config http.sslVerify "false"

```



