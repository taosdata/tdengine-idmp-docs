# Copyright (c) TAOS Data, Inc. All rights reserved.
#
# SPDX-License-Identifier: LicenseRef-TAOSData-Commercial
#
# This file is proprietary to TAOS Data, Inc. and may contain confidential
# information. No rights are granted by this file. Use is permitted only
# under a written agreement with TAOS Data, Inc. or an authorized affiliate.
# Unauthorized copying, modification, distribution, or disclosure, in whole
# or in part, by any medium, is strictly prohibited.

import sys
import json

version_list = sys.argv[1:]

if __name__ == '__main__':
    version_list.sort(
        key=lambda v: [int(u) for u in v.replace('v', '').split('-')[0].split('.')],
        reverse=True
    )
    version_list.insert(0, 'latest')
    print(json.dumps(version_list))