# 🧪 [testing improvement] Add test coverage for invalid move error handling in Tutorial

**🎯 What:**
The testing gap addressed is the lack of coverage for the error handling path when `chess.js` throws an error on an invalid move in the Tutorial component.

**📊 Coverage:**
The `handles invalid moves safely without throwing` test was updated to mock and spy on `console.warn`, ensuring that not only does the component safely handle the exception, but it also properly logs the invalid move error.

**✨ Result:**
Improved test coverage for error conditions, ensuring that invalid move logging remains functional and doesn't get inadvertently removed.
