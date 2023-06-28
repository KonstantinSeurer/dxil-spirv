#version 460
#extension GL_KHR_shader_subgroup_vote : require

layout(set = 0, binding = 0, r32ui) uniform writeonly uimageBuffer _8;

layout(location = 0) flat in uint INDEX;
bool discard_state;

void discard_exit()
{
    if (discard_state)
    {
        discard;
    }
}

void main()
{
    discard_state = false;
    if (INDEX == 40u)
    {
        discard_state = true;
    }
    if (subgroupAllEqual(INDEX))
    {
        imageStore(_8, int(INDEX), uvec4(1u));
    }
    discard_exit();
}


#if 0
// SPIR-V disassembly
; SPIR-V
; Version: 1.3
; Generator: Unknown(30017); 21022
; Bound: 45
; Schema: 0
OpCapability Shader
OpCapability ImageBuffer
OpCapability GroupNonUniformVote
OpMemoryModel Logical GLSL450
OpEntryPoint Fragment %3 "main" %10 %34
OpExecutionMode %3 OriginUpperLeft
OpName %3 "main"
OpName %10 "INDEX"
OpName %17 "discard_state"
OpName %37 "discard_exit"
OpDecorate %8 DescriptorSet 0
OpDecorate %8 Binding 0
OpDecorate %8 NonReadable
OpDecorate %10 Flat
OpDecorate %10 Location 0
OpDecorate %34 BuiltIn HelperInvocation
%1 = OpTypeVoid
%2 = OpTypeFunction %1
%5 = OpTypeInt 32 0
%6 = OpTypeImage %5 Buffer 0 0 0 2 R32ui
%7 = OpTypePointer UniformConstant %6
%8 = OpVariable %7 UniformConstant
%9 = OpTypePointer Input %5
%10 = OpVariable %9 Input
%13 = OpTypeBool
%15 = OpConstant %5 40
%16 = OpTypePointer Private %13
%17 = OpVariable %16 Private
%18 = OpConstantFalse %13
%20 = OpConstant %5 3
%23 = OpConstant %5 2
%24 = OpConstant %5 1
%25 = OpTypeVector %5 4
%32 = OpConstantTrue %13
%33 = OpTypePointer Input %13
%34 = OpVariable %33 Input
%3 = OpFunction %1 None %2
%4 = OpLabel
OpStore %17 %18
OpBranch %27
%27 = OpLabel
%11 = OpLoad %6 %8
%12 = OpLoad %5 %10
%14 = OpIEqual %13 %12 %15
OpSelectionMerge %29 None
OpBranchConditional %14 %28 %29
%28 = OpLabel
OpStore %17 %32
OpBranch %29
%29 = OpLabel
%35 = OpLoad %13 %34
%36 = OpLoad %13 %17
%21 = OpLogicalOr %13 %35 %36
%19 = OpGroupNonUniformAllEqual %13 %20 %12
OpSelectionMerge %31 None
OpBranchConditional %19 %30 %31
%30 = OpLabel
%22 = OpShiftLeftLogical %5 %12 %23
%26 = OpCompositeConstruct %25 %24 %24 %24 %24
OpImageWrite %11 %12 %26
OpBranch %31
%31 = OpLabel
%43 = OpFunctionCall %1 %37
OpReturn
OpFunctionEnd
%37 = OpFunction %1 None %2
%38 = OpLabel
%41 = OpLoad %13 %17
OpSelectionMerge %40 None
OpBranchConditional %41 %39 %40
%39 = OpLabel
OpKill
%40 = OpLabel
OpReturn
OpFunctionEnd
#endif
