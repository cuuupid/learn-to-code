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
- dotfiles, or files that start with a `.` are hidden and will not show if you `ls`. For these you need to add a **flag** to the ls command (we will discuss flags later). Running `ls -laF` will show all files, the timestamps, and the privileges.
- `.` alone refers to the current directory (`cd .` does nothing becuase you are entering the directory you are already in).
- `..` refers to the previous directory (`cd ..` will take you up to the parent folder, e.g. from `github` to `Documents`)
- `/` is the root directory (`cd /` takes you to the root dir), and is the highest level directory. There is no directory higher than `/` (or at least for our purposes) and all paths starting with a `/` will be **absolute**.
  - What do I mean by absolute? `cd github` takes me inside the github folder from the current directory. `cd /etc` will take me to the "etc" directory under the root directory. Relative paths start from the current directory (`cd ../../github` takes me up two levels and into the github directory) while absolute paths start from the root directory or home directory (`cd ~/Documents/github` will take me to the home directory then into Documents then into github folder).
- Some directories are protected and you will not be able to enter them (we will discuss later how to modify permissions).