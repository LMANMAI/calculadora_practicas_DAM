import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ButtonComponent } from "../../components";
import { numberButtons } from "./statics";
import { Colors } from "../../src/estilos_globals";

export default function index() {
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [reservedValue, setReservedValue] = useState<string | undefined>();

  const [currentAction, setCurrentAction] = useState<String>("");
  const [history, setHistory] = useState<String[]>([]);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  const handleValue = (digit: string) => {
    if (digit === "." && currentValue.includes(".")) return;

    setCurrentValue((prev) => {
      const newValue = prev === "0" || isResultDisplayed ? digit : prev + digit;
      return digit === "." && isResultDisplayed ? "0." : newValue;
    });
    setIsResultDisplayed(false);
  };

  const handleReset = () => {
    setCurrentValue("");
    setIsResultDisplayed(false);
  };
  const getOperation = (operation: string) => {
    setReservedValue(currentValue);
    setCurrentValue("0");
    setCurrentAction(operation);
  };

  const resolveOperation = () => {
    if (!reservedValue) return;

    const a = parseFloat(reservedValue);
    const b = parseFloat(currentValue);
    let result = 0;

    switch (currentAction) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      default:
        return;
    }

    setCurrentValue(result.toString());
    setHistory((prev) => [...prev, `${a} ${currentAction} ${b} = ${result}`]);
    setIsResultDisplayed(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        {history.slice(-3).map((item, index) => (
          <Text key={index} style={styles.historial}>
            {item}
          </Text>
        ))}
      </View>

      <View style={styles.display}>
        <Text style={styles.textDisplay}>{currentValue}</Text>
      </View>

      <View style={styles.grillaBotones}>
        {numberButtons.map((col, colIndex) => (
          <View key={colIndex} style={styles.columnaBotones}>
            {col.map((label) => {
              const isOperator = ["+", "-", "*", "/", "X"].includes(label);

              return (
                <ButtonComponent
                  key={label}
                  color={isOperator ? Colors.buttonOp : Colors.buttonGray}
                  label={label}
                  pressFunction={() => {
                    if (label === "C") {
                      handleReset();
                    } else if (label === ".") {
                      handleValue(".");
                    } else if (isOperator) {
                      getOperation(label === "X" ? "*" : label);
                    } else {
                      handleValue(label);
                    }
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>

      <ButtonComponent
        color="orange"
        label="="
        pressFunction={resolveOperation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
    backgroundColor: Colors.primary,
  },
  display: {
    height: 100,
    borderRadius: 5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: Colors.displayBg,
  },
  textDisplay: {
    fontSize: 40,
    color: Colors.hist,
  },
  historial: {
    fontSize: 14,
    color: Colors.hist,
  },
  grillaBotones: {
    flexDirection: "row",
    gap: 10,
  },
  columnaBotones: {
    flex: 1,
    gap: 10,
  },
});
