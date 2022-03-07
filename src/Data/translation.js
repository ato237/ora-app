import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
    en: {
      charge: "Charges of",
      amnt: "Amount",
      ser: "Select Service",
      opr: "Select Operation",
      instr: "Press to get charge",
      instr2: "Press to Convert",
      search:"Search Currency code",

      enter: "Enter Amount",
      calc: "Calculate",
      retM: "MTN Withdrawal Fee",
      retO: "Orange Withdrawal Fee",
      retEU: "EUMoney Withdrawal Fee",
      trans: "MTN Client Transfer Fee",
      nonTrans: "Non-MTN Client Transfer Fee",
      trans2: "Orange client Transfer Fee",
      nonTrans2: "Non-Orange Client Transfer Fee",
      trans3: "EuMoney client Transfer Fee",
      nonTrans3: "non-EUMoney Client Transfer Fee",
      press: "Press Calcualte Button",
      tittle:"Charges Calculator",
        con: "Currency Converter",
        enter:"Please Enter Amount",
        dec:"Please remove Decimal",
        conve:"Convert",
        pressCalc:"Press Convert Button"

    },
    fr: {
      charge: "Frais de",
      amnt: "Montant",
      ser: "Selectionner Service",
      opr: "Selectionner Operation",
      instr: "Appuyer pour avoir les frais",
      enter: "Entrer Montant",
      calc: "Calculer",
      retM: "Frais de Retrait MTN",
      retO: "Frais de Retrait Orange",
      retEU: "Frais de Retrait EUMoney",
      trans: "Frais de Transfert a MTN",
      nonTrans: "Frais de Transfert a non Client MTN ",
      trans2: "Frais de Transfert a Orange",
      nonTrans2: "Frais de Transfert a Client non Orange ",
      trans3: "Frais de Transfert a EuMoney",
      nonTrans3: "Frais de Transfert a Client non EuMoney ",
      press: "Appuyer sur le Button Calculer",
      tittle: "Calculatrice de frais",
      con:"Convertisseur de Devise",
      enter: "Veuillez entrer le montant",
      dec:"Veuillez supprimer la décimale",
      conve:"Convertir",
      pressCalc:"Appuyer sur le Button Convertir",
      instr2: "Appuyer pour convertir",
      search:"Rechercher le code de devise"




    },
  };
  

  i18n.fallbacks = true;
  i18n.locale = Localization.locale;
  Localization.getLocalizationAsync();
  
export default i18n;