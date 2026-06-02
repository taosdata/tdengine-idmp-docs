#!/bin/bash
# TDengine IDMP 文档本地检查脚本
# 在提交前运行此脚本，确保文档能通过 CI 检查

set -e

echo "=========================================="
echo "TDengine IDMP 文档本地检查"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 安装缺失的工具
install_tools() {
    echo -e "${YELLOW}正在安装缺失的工具...${NC}"
    
    if ! command_exists markdownlint; then
        echo "安装 markdownlint-cli..."
        npm install -g markdownlint-cli
    fi
    
    if ! command_exists markdownlint-cli2; then
        echo "安装 markdownlint-cli2..."
        npm install -g markdownlint-cli2
    fi
    
    if ! command_exists typos; then
        echo "安装 typos..."
        echo "请访问 https://github.com/crate-ci/typos/releases 下载安装"
        echo "或使用 cargo: cargo install typos-cli"
        exit 1
    fi
    
    if ! command_exists autocorrect; then
        echo "安装 autocorrect..."
        npm install -g @huacnlee/autocorrect
    fi
    
    echo -e "${GREEN}工具安装完成${NC}"
    echo ""
}

# 显示帮助
show_help() {
    echo "用法: bash check-local.sh [选项]"
    echo ""
    echo "选项:"
    echo "  --install    安装所需工具"
    echo "  --fix        尝试自动修复问题"
    echo "  --help       显示帮助信息"
    echo ""
    echo "示例:"
    echo "  bash check-local.sh              # 运行检查"
    echo "  bash check-local.sh --fix        # 自动修复并检查"
    echo ""
}

# 解析参数
FIX_MODE=false
INSTALL_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --fix)
            FIX_MODE=true
            shift
            ;;
        --install)
            INSTALL_MODE=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo "未知参数: $1"
            show_help
            exit 1
            ;;
    esac
done

# 安装模式
if [ "$INSTALL_MODE" = true ]; then
    install_tools
    exit 0
fi

# 检查工具
echo "检查工具..."
MISSING_TOOLS=()

if ! command_exists markdownlint; then
    MISSING_TOOLS+=("markdownlint-cli")
fi

if ! command_exists markdownlint-cli2; then
    MISSING_TOOLS+=("markdownlint-cli2")
fi

if ! command_exists typos; then
    MISSING_TOOLS+=("typos")
fi

if ! command_exists autocorrect; then
    MISSING_TOOLS+=("autocorrect")
fi

if [ ${#MISSING_TOOLS[@]} -ne 0 ]; then
    echo -e "${RED}缺少以下工具: ${MISSING_TOOLS[*]}${NC}"
    echo "运行 'bash check-local.sh --install' 安装"
    exit 1
fi

echo -e "${GREEN}所有工具已安装${NC}"
echo ""

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
cd "$PROJECT_ROOT"

echo "项目目录: $PROJECT_ROOT"
echo ""

# 运行检查
CHECK_FAILED=0

# 1. Markdown Lint (基础)
echo "=========================================="
echo "1/4 运行 Markdown Lint (基础)..."
echo "=========================================="
if markdownlint -c .github/workflows/markdown_config.json --ignore .claude ./ 2>/dev/null; then
    echo -e "${GREEN}✓ Markdown Lint (基础) 通过${NC}"
else
    echo -e "${YELLOW}⚠ Markdown Lint (基础) 发现问题${NC}"
    CHECK_FAILED=1
fi
echo ""

# 2. Markdown Lint Cli2
echo "=========================================="
echo "2/4 运行 Markdown Lint Cli2..."
echo "=========================================="
if npx markdownlint-cli2 --config .github/workflows/.markdownlint-cli2.jsonc "docs/**/*.md" "i18n/en/docusaurus-plugin-content-docs/current/**/*.md" 2>&1 | grep -q "0 error"; then
    echo -e "${GREEN}✓ Markdown Lint Cli2 通过${NC}"
else
    echo -e "${YELLOW}⚠ Markdown Lint Cli2 发现问题${NC}"
    npx markdownlint-cli2 --config .github/workflows/.markdownlint-cli2.jsonc "docs/**/*.md" "i18n/en/docusaurus-plugin-content-docs/current/**/*.md" 2>&1 || true
    CHECK_FAILED=1
fi
echo ""

# 3. Typos 检查
echo "=========================================="
echo "3/4 运行拼写检查 (typos)..."
echo "=========================================="
if typos --config .github/workflows/typos.toml --exclude .claude ./**/*.md 2>/dev/null; then
    echo -e "${GREEN}✓ 拼写检查通过${NC}"
else
    echo -e "${YELLOW}⚠ 拼写检查发现问题${NC}"
    typos --config .github/workflows/typos.toml --exclude .claude ./**/*.md || true
    CHECK_FAILED=1
fi

# 英文文档拼写检查
if typos --config .github/workflows/typos.toml ./i18n/en/docusaurus-plugin-content-docs/current 2>/dev/null; then
    echo -e "${GREEN}✓ 英文文档拼写检查通过${NC}"
else
    echo -e "${YELLOW}⚠ 英文文档拼写检查发现问题${NC}"
    typos --config .github/workflows/typos.toml ./i18n/en/docusaurus-plugin-content-docs/current || true
    CHECK_FAILED=1
fi
echo ""

# 4. AutoCorrect 检查
echo "=========================================="
echo "4/4 运行中文排版检查 (AutoCorrect)..."
echo "=========================================="
# AutoCorrect 会自动读取 .autocorrectrc 配置文件，其中已排除 .claude 目录
if autocorrect --lint ./**/*.md 2>/dev/null | grep -q "0 error"; then
    echo -e "${GREEN}✓ 中文排版检查通过${NC}"
else
    echo -e "${YELLOW}⚠ 中文排版检查发现问题${NC}"
    autocorrect --lint ./**/*.md || true
    CHECK_FAILED=1
fi
echo ""

# 自动修复
if [ "$FIX_MODE" = true ]; then
    echo "=========================================="
    echo "自动修复模式"
    echo "=========================================="
    
    echo "运行 AutoCorrect 自动修复..."
    autocorrect --fix ./**/*.md 2>/dev/null || true
    
    echo "尝试修复常见 Markdown 问题..."
    # 修复 MD036: 加粗作为标题
    find docs i18n -name "*.md" -exec perl -i -pe 's/^\*\*([^*]+)\*\*$/### $1/' {} \; 2>/dev/null || true
    
    echo -e "${GREEN}自动修复完成，请重新运行检查${NC}"
    echo ""
fi

# 总结
echo "=========================================="
echo "检查完成"
echo "=========================================="
if [ $CHECK_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ 所有检查通过！可以安全提交。${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ 发现一些问题，请修复后再提交。${NC}"
    echo ""
    echo "提示:"
    echo "  - 运行 'bash check-local.sh --fix' 尝试自动修复"
    echo "  - 查看 .claude/skills/doc-writing/SKILL.md 了解规范"
    exit 1
fi
