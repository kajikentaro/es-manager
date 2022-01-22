import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item } from "interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import styles from "styles/TermSelect.module.scss";
import { genRandomId } from "utils/utils";

type Props<T> = {
  item: T | undefined;
  itemList: T[];
  onDefineItem: (item: T) => void;
};

const TermCreate = <T extends Item>(props: Props<T>) => {
  const { item, onDefineItem, itemList } = props;
  const [filterdItemList, setFilterdItemList] = useState<T[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [inputState, setInputState] = useState<"focus" | "blur" | "define">("blur");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHoverCandidate, setIsHoverCandidate] = useState<boolean>(false);

  useEffect(() => {
    if (item) {
      setInputState("define");
      setInputText(item.name);
    }
  }, [item]);

  useEffect(() => {
    if (inputText.length > 0) {
      setFilterdItemList(
        itemList.filter((v) => {
          return v.name.indexOf(inputText) !== -1;
        })
      );
    } else {
      setFilterdItemList(itemList);
    }
  }, [inputText, itemList]);

  const handleDefineItem = () => {
    if (inputText.length === 0) {
      setInputState("blur");
      return;
    }
    const sameItem = filterdItemList.find((v) => {
      return v.name === inputText;
    });
    if (sameItem) {
      onDefineItem(sameItem);
    } else {
      const newItem: Item = { name: inputText, id: genRandomId() };
      onDefineItem(newItem as T);
    }
    setInputState("define");
  };

  return (
    <form
      className={styles.term_select + " " + styles[inputState]}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onFocus={() => {
        setInputState("focus");
      }}
    >
      <div
        className={styles.define_text + " " + styles[inputState]}
        onClick={() => {
          if (inputRef && inputRef.current) {
            inputRef.current.focus();
          }
          setInputState("focus");
        }}
      >
        <p>{inputText}</p>
      </div>
      <input
        className={styles[inputState]}
        placeholder="ここに入力"
        onBlur={() => {
          if (!isHoverCandidate) {
            handleDefineItem();
          }
        }}
        onChange={(v) => {
          v.preventDefault();
          setInputText(v.target.value);
        }}
        value={inputText}
        ref={inputRef}
      />
      <button
        onClick={() => {
          handleDefineItem();
        }}
        className={styles.check_btn}
        style={{
          display: inputText.length > 0 && inputState === "focus" ? "inherit" : "none",
        }}
      >
        <FontAwesomeIcon icon={faCheck} color="#228B22" />
      </button>
      {filterdItemList.length > 0 && (
        <ul className={styles.candidate + " " + styles[inputState]}>
          {filterdItemList.map((v) => {
            return (
              <li
                key={v.id}
                onMouseOver={() => {
                  setIsHoverCandidate(true);
                }}
                onMouseLeave={() => {
                  setIsHoverCandidate(false);
                }}
                onClick={() => {
                  setInputState("define");
                  setInputText(v.name);
                  onDefineItem(v);
                }}
              >
                {v.name}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};
export default TermCreate;
