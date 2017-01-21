source colors.sh

# Prompts
echo
echo -e "               Verifying Dependencies..."
echo -e "${Dim}--------------------------------------------------------${RCol}"

# Dependency management
MISSING_DEPENDENCIES=()
report_error() {
    echo -e " ${BRed}Missing${RCol}: ${Bol}$1"
}
report_found() {
    echo -e " ${BGre}Found:${RCol}   ${Bol}$1${RCol} $2"
}

prompt_install() {
    echo -e "   ${Bol}$1${RCol} not found."
    while true; do
        printf "   is ${Bol}$1${RCol} installed (Yn): "
        read -n 1 prompt_response
        if [[ ! -z "$prompt_response" ]]; then
            case "$prompt_response" in
                Y)
                    should_install=true
                    break 2;;
                n)
                    should_install=false
                    break 2;;
                *) printf "\r\033[K"; ;;
            esac
        else
            printf "\033[1A\033[K"
        fi
    done
    echo
    
    printf "\033[1A\033[K\033[1A\033[K"
    
    if [ "$should_install" = true ]; then
        should_rm_last=false
        while true; do
            printf " Path for ${Bol}$1${RCol}: "
            read res_path

            if [[ ! -z "$res_path" ]]; then
                if [[ ! -e "$res_path" ]]; then
                    if [ $should_rm_last = true ]; then
                        printf "\033[1A\033[2K"
                    fi
                    printf "\033[1A\033[K"
                    echo -e " '$res_path' does not exist."
                    should_rm_last=true
                else
                    if [ $should_rm_last = true ]; then
                        printf "\033[1A\033[K\033"
                    fi

                    printf "\033[1A\033[K"
                    report_found "$1" "at ${res_path}"
                    break
                fi
            fi
        done
        response="$res_path"
    else
        report_error "$1"
    fi
}

# Make
if ! type "make" &> /dev/null; then
    MISSING_DEPENDENCIES+="build-essential"
    report_error "Make"
else
    report_found "Make"
fi

# Python2
if ! type "python2-config" &> /dev/null; then
    # Prompt for python
    prompt_install "Python 2" "python2-config"
    if [[ -z "$response" ]]; then
        MISSING_DEPENDENCIES+="python2"
    else
        export PYTHON_PATH="$response"
    fi
else
    report_found "Python 2"
fi

# Insatll Dependencies
echo
for i in "${MISSING_DEPENDENCIES[@]}"; do
    case "$i" in
        python2)
            echo -e "Installing ${Bol}Python 2.7-dev${RCol}"
            if type "apt-get" &> /dev/null; then
                apt-get install python2.7-dev 1> /dev/null
            elif type "yum" &> /dev/null; then
                yum install python-devel 1> /dev/null
            fi
            break;;
    esac
done
