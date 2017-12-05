# How to Bash

## Running Bash

I'm on **Windows,** click Start and scroll the apps to "Bash on Ubuntu for ...". Click this, it'll open a bash terminal.
I'm on **Mac,** run Terminal from spotlight search (or if you got the better terminal, run Hyper!).

Please complete the Git and Homebrew installations in the README.

We call the view you're seeing now the `console`, `bash console`, `terminal`, or `shell`. There are lots of names for it :ghost:.

## Testing your installation

Open bash. You'll be in the home directory. Run the following. (After each command you send to bash you have to press enter.)
``` bash
cd Documents
mkdir github
cd github
git clone https://github.com/pshah123/learn-to-code # this may take a while
cd learn-to-code
cd bash
bash helloworld.sh
```

At the end you should see an output like `Hello World`.

## Navigating with Terminal

There are two basic commands to navigate with bash--`cd` and `ls`.

(I will use the words directory, dir and folder interchangeably.)

`cd` allows you to enter folders (it stands for Change Directory). For example, if my shell is currently at the `Documents` folder and I want to enter the `github` folder which is in the `Documents` folder, I will type `cd github`. This instructs the shell to change the current directory to the directory you specify (in essence you are opening that folder).

`ls` allows you to list the contents of the current directory. For example, if I am in the `learn-to-code` folder and inside there are three items (`bash` folder, `js` folder, `python` folder, and `README.md`), then if I type `ls` I can expect output like the following:

```
bash
js
python
README.md
```

Between these two commands you can navigate your entire filesystem, running just cd and ls to find your way around.

Here are some important things to remember:

- `~` is the home directory. `cd ~` will bring you to the home directory (on Windows WSL this is a separate directory, on Mac this is your "Home" folder).
- dotfiles, or files that start with a `.` are hidden and will not show if you `ls`. For these you need to add **flags** to the ls command (we will discuss flags later). Running `ls -laF` will show all files, the timestamps, and the privileges.
- `.` alone refers to the current directory (`cd .` does nothing becuase you are entering the directory you are already in).
- `..` refers to the previous directory (`cd ..` will take you up to the parent folder, e.g. from `github` to `Documents`)
- `/` is the root directory (`cd /` takes you to the root dir), and is the highest level directory. There is no directory higher than `/` (or at least for our purposes) and all paths starting with a `/` will be **absolute**.
  - What do I mean by absolute? `cd github` takes me inside the github folder from the current directory. `cd /etc` will take me to the "etc" directory under the root directory. Relative paths start from the current directory (`cd ../../github` takes me up two levels and into the github directory) while absolute paths start from the root directory or home directory (`cd ~/Documents/github` will take me to the home directory then into Documents then into github folder).
- Some directories are protected and you will not be able to enter them (we will discuss **chmod** later how to modify permissions).
- You can always run the `pwd` command, which will simply output the current directory path (e.g. if I run `pwd` in Documents it'll give me `/Users/pshah123/Documents`).
- You can give directories as options to `ls`, e.g. `ls ..` or `ls /` to print contents of those directories instead.

## Basic Read/Write

You'll need to know 4 basic commands for basic read/write--`echo`, `cat`, `mkdir`, and `touch`.

`echo` - echoes out whatever you give it. e.g. `echo hello world` will print hello world to the console.

`cat` - gives back the contents of a file. e.g. `cat README.md` will print out the contents of the `helloworld.sh` file

`mkdir` - creates a directory. e.g. `mkdir tmp` makes a folder called `tmp`.

`touch` - "touches" a file, meaning it will exist. `touch temp` to create a file called `temp`. It has no contents but it exists.

## Removing

`rm` is the command to remove. Be careful as this **permanently removes the file`. Not to recycle bin or trash, but deleted.

`rm temp` will remove the temp file.

To remove a folder you will need two flags, `-rf`. The `f` specifies folder and `r` specifies recursive deletion (delete every file inside and this folder).

`rm -rf tmp` will remove the tmp folder.

## More Read/Write

To write contents to a file, try running `echo Hello World >> hello`. The `hello` file will now have `Hello World` (you can check this by running `cat hello`).

`>>` indicates to send all output to the file. `cat file1 >> file2` will write the contents of file1 to file2.

You can also _pipe_ content. The `|` or pipe character designates that what is to the left should be sent to what is on the right as input. For example `cat helloworld.sh` will spit out the contents of `helloworld.sh`. If we run `cat helloworld.sh | cat`, we pipe the contents of `helloworld.sh` to the `cat` command, which will spit out the result (the output will be the same, but it will have gone through 2 `cat`s). This is useful for very advanced commands but it is unlikely you will use this. A common use is to use one script to spit out something and then use that as the input for another script--this chain of scripts that use the previous script as an input is called a `pipeline`.

To edit files, you can use a number of solutions. Some systems have `vim` or `nano` installed, and you can edit files inside the terminal by running `vim <filename>` (to exit Vim, do Ctrl+C, type :wq to write your changes and quit, and then hit enter) or `nano <filename>` (to exit Nano, do Ctrl+X, and 'Y' to save changes and enter to exit).

We installed **VSCode** already so we can use the `code` command to open up files in VSCode. `code <filename>` will open the file in VSCode for editing whereas `code .` or `code <foldername>` will open up a folder in VSCode.

## Flags

I've been mentioning flags a lot, so I'll briefly explain flags. Flags are given using the `-` or `--` symbols, and are analogous to options for commands.

For example, the `all` flag for `ls` shows all files, even hidden ones. You can give the all flag in long form using `--`, e.g. `ls --all`, or you can give it shorthand using just the first character, e.g. `ls -a`.

(almost) All commands have the `help` flag that can be shown by running `<command> --help`, which prints out some helpful info. (**You can also run `man <command>` to view the man_ual_ on that command.**)

Let's analyze the command we used earlier, `ls -laF`. `ls` as we know gives us the contents of the current directory. 

- The `a` flag (shorthand for `all`) shows us all files, including hidden files/directories. 
- The `l` flag gives us information, including the size of the directory, size of each file, timestamp, permissions, and colorcodes based on level of permissions the file has and whether it was edited and whether it is just a symlink (aka shortcut). 
- The `F` flag adds a `/` to the end of directory names so we can differentiate between what is a folder and what is a file.

Instead of typing `ls -l -a -F`, we can combine them all under one shorthand flag, `ls -laF`. The - tells the command that the next sequence of characters are all one letter flags. **DO NOT combine long flags, e.g. you cannot type `ls --allhelp` for both the all and help flags. These could be other flags.**

## Permissions

I've been talking about permissions a lot lately as well. Permissions tell the system who is allowed to touch what.

There are three levels of permissions: Read, Write, Execute. (r, w, x)

There are three rings of permissions for `chmod`, and these are **Owner**, **Group**, and **Public**. The owner of a file has permissions, the group of users the owner belongs to has other permissions, and everyone else has their own set of permissions.

e.g. rwx for the owner signals the owner can read, write, and execute.

Permissions are generally expressed in 9 characters:
```
_ _ _ _ _ _ _ _ _
1 2 3 4 5 6 7 8 9
```

Where each set of three corresponds to owner, group, and public respectively.

Examples:

`rwxrwxrwx` says everyone can do everything.

`rwxrwxr-x` says only the owner or the group can write the file.

`rwxr-x--x` says only the owner can read, write, and execute, the group the owner belongs to can read and execute, and the public can only execute the script.

`r--------` says only the owner can read, and no one can do anything else.

As you can see, the permissions are either "on" or "off", e.g. a ring either can or cannot write a file. This allows permissions to be masked very easily to binary:
```
r w x r w - r - -
1 1 1 1 1 0 1 0 0
```
Which can then be converted into an octal base mask (we use octal because the max is 111 = 7 so we can save on memory by using octal):

111 = 7
110 = 6
100 = 4

Therefore the permissions are 764.


When you `ls -l` you'll see these permissions, e.g.

```
~/Documents/github/learn-to-code/bash $> ls -laF
total 8206
drwxrwxrwx 0 root root  512 Dec  5 17:17 ./
drwxrwxrwx 0 root root  512 Dec  5 16:36 ../
-rwxrwxrwx 1 root root   21 Dec  5 16:38 helloworld.sh*
-rwxrwxrwx 1 root root 8877 Dec  5 17:46 README.md*
```

- The first charcter on the line is usually either a `-` (for files) or a `d` (for directories).
- The next 9 characters show you the permissions, I have mine set to rwx for everyone.
- The number after these 10 characters is the number of links to this file (again, basically shortcuts).
- The next string is the person who owns it, I was root when I made these files so it says `root`.
- The next string is the group of the owner, the `root` user belongs to the `root` group so thats what that says.
- The next string of digits is the filesize.
- Then there is the timestamp, and lastly the name.

We can change the permissions pretty easily by using `chmod`.

The syntax is as follows:

``` bash
chmod <mode> <filename>
```

Where mode is the octal mask for permissions and filename gives the file to be changed.

e.g. to set rwxrwxrwx (everyone can do everything) permissions to `hello.txt`:

rwx rwx rwx = 111 111 111 = 7 7 7, so the mode is 777

``` bash
chmod 777 hello.txt
```