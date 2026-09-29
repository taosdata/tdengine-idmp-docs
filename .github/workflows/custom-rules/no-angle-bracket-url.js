/*
 * Copyright (c) TAOS Data, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: LicenseRef-TAOSData-Commercial
 *
 * This file is proprietary to TAOS Data, Inc. and may contain confidential
 * information. No rights are granted by this file. Use is permitted only
 * under a written agreement with TAOS Data, Inc. or an authorized affiliate.
 * Unauthorized copying, modification, distribution, or disclosure, in whole
 * or in part, by any medium, is strictly prohibited.
 */

module.exports = {
  names: ["no-angle-bracket-url"],
  description: "Disallow angle bracket auto-links",
  tags: ["links"],
  function: function params(params, onError) {
    params.tokens.forEach(token => {
      if (token.type === "inline" && token.content.match(/<https?:\/\/[^>]+>/)) {
        onError({
          lineNumber: token.lineNumber,
          detail: "Do not use angle bracket auto-links. Use [text](url) instead."
        });
      }
    });
  }
};