source colors.sh

echo
echo -e "                     Configuration"
echo -e "${Dim}--------------------------------------------------------${RCol}"

do_prompt_yn() {
    while true; do
        printf " $1 (Yn)[${Bol}$2${RCol}]: "
        read -n 1 prompt_response
        if [[ ! -z "$prompt_response" ]]; then
            case $prompt_response in
                Y)
                    respond_with=true
                    break 2;;
                n)
                    respond_with=false
                    break 2;;
                *) printf "\r\033[K"; ;;
            esac
        else
            respond_with="$2"
            break
        fi
    done

    RESULT="${respond_with}"
}

do_prompt_path() {
    has_run=false
    while true; do
        printf " $1 [${Bol}$2${RCol}]: "
        read RESULT

        if [[ -z "$RESULT" ]]; then
            RESULT="$2"
            break
        elif [[ ! -e "$RESULT" ]]; then
            printf "\033[K\033[A\033[K"
            if [ "$has_run" = true ]; then
                printf "\033[A\033[K"
            fi
            echo " '${RESULT}' does not exist."
            has_run=true
        else
            break
        fi
    done

    printf "\033[A\033K"
}

# Installation Location
do_prompt_path "Installation Location" "/usr/local/bin"
CHEDDAR_TARGET="$RESULT"

# Python 
do_prompt_yn "Install Python Bindings" "Y"
CHEDDAR_BINDINGS_PYTHON="$RESULT"
