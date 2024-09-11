import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 200,
  },
  welcomeHeader: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  artworksHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 25,
    marginBottom: 10,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  navigationMenu: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 0,
    width: 350,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#CEB89E",
    paddingTop: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    marginBottom: 5,
  },
  menuText: {
    color: "white",
    fontSize: 12,
  },
  artworksMenu: {
    flexDirection: "row",
    justifyContent: "space-around",

    paddingTop: 10,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: "#CEB89E",
    padding: 10,
  },

  profileText: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileInfoText: {
    fontSize: 14,
    color: "white",
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#CEB89E",
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  salesList: {
    marginTop: 20,
  },
  saleItem: {
    borderRadius: 10,
    padding: 20,
    borderRadius: 0,
    borderWidth: 2,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    fontSize: 16,
    borderBottomColor: "#CEB89E",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  saleItemLeft: {
    padding: 10,
  },
  saleItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  saleItemDateStatus: {
    marginBottom: 2,
  },
  saleGreenText: {
    fontSize: 14,
    color: "green",
  },
  saleItemRight: {},
  salePriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  activeMenuItem: {
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#CEB89E",
  },
  activeMenuText: {
    color: "black",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
});
