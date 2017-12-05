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

To write contents to a file, try running `echo Hello World >> hello`.

`>>` indicates to send all output to the file. `cat file1 >> file2` will write the contents of file1 to file2.

You can also _pipe_ content. The `|` or pipe character designates that what is to the left should be sent to what is on the right as input. For example `cat helloworld.sh` will spit out the contents of `helloworld.sh`. If we run `cat helloworld.sh | cat`, we pipe the contents of `helloworld.sh` to the `cat` command, which will spit out the result (the output will be the same, but it will have gone through 2 `cat`s). This is useful for very advanced commands but it is unlikely you will use this. A common use is to use one script to spit out something and then use that as the input for another script--this chain of scripts that use the previous script as an input is called a `pipeline`.

To edit files, you can use a number of solutions. Some systems have `vim` or `nano` installed, and you can edit files inside the terminal by running `vim <filename>` (to exit Vim, do Ctrl+C, type :wq to write your changes and quit, and then hit enter) or `nano <filename>` (to exit Nano, do Ctrl+X, and 'Y' to save changes and enter to exit).

We installed **VSCode** already so we can use the `code` command to open up files in VSCode. `code <filename>` will open the file in VSCode for editing whereas `code .` or `code <foldername>` will open up a folder in VSCode.

